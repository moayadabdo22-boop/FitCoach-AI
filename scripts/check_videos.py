#!/usr/bin/env python3
"""
Scan and classify video files under public/videos/back-muscles and cross-check
with the filename lists in src/data/exerciseVideoResolver.ts.
Generates scripts/reports/videos_report.json and .csv
"""
from pathlib import Path
import re
import json
import csv
import sys

REPO_ROOT = Path(__file__).resolve().parent.parent
VIDEO_BASE = REPO_ROOT / "public" / "videos" / "back-muscles"
RESOLVER_TS = REPO_ROOT / "src" / "data" / "exerciseVideoResolver.ts"
REPORTS_DIR = REPO_ROOT / "scripts" / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def extract_array(ts_text: str, name: str):
    pattern = rf"const\s+{name}\s*=\s*\[((?:.|\n)*?)\]\s*as const"
    m = re.search(pattern, ts_text, re.DOTALL)
    if not m:
        return []
    block = m.group(1)
    items = re.findall(r"['\"]([^'\"]+)['\"]", block)
    return items


def parse_clip(filename: str, folder_gender: str | None = None):
    base = re.sub(r"\.mp4$", "", filename, flags=re.I)

    # Underscore-delimited (structured) filenames
    if "_" in base:
        parts = base.split("_")
        muscle = parts[0]
        location = "home" if any(p.lower() == "home" for p in parts) else ("gym" if any(p.lower() == "gym" for p in parts) else "unknown")
        goal = "general" if any(p.lower() == "general" for p in parts) else "build"
        gender = folder_gender or ("female" if "female" in base.lower() else ("male" if "male" in base.lower() else None))
        return {
            "muscle": muscle,
            "location": location,
            "goal": goal,
            "gender": gender,
        }

    # Hyphenated or free-form names
    b = re.sub(r"\(\d+\)$", "", base)  # strip trailing (1)
    b = re.sub(r"-(female|male)$", "", b, flags=re.I)
    # remove common suffixes
    for s in ["-advanced", "-advance", "-basic", "_advanced", "_basic"]:
        b = re.sub(re.escape(s) + r"$", "", b, flags=re.I)

    muscle = b
    location = "home" if re.search(r"\bhome\b", base, re.I) else ("gym" if re.search(r"\bgym\b", base, re.I) else "unknown")
    if re.search(r"\bgeneral\b", base, re.I) or re.search(r"-basic\b", base, re.I) or re.search(r"basic\b", base, re.I):
        goal = "general"
    elif re.search(r"advanced\b", base, re.I) or re.search(r"-advance\b", base, re.I):
        goal = "build"
    else:
        goal = "unknown"

    gender = folder_gender or ("female" if "female" in base.lower() else ("male" if "male" in base.lower() else None))

    return {
        "muscle": muscle,
        "location": location,
        "goal": goal,
        "gender": gender,
    }


def main():
    if not RESOLVER_TS.exists():
        print(f"ERROR: resolver file not found at {RESOLVER_TS}")
        sys.exit(2)

    ts_text = RESOLVER_TS.read_text(encoding="utf-8")
    resolver_female = extract_array(ts_text, "FEMALE_VIDEO_FILES")
    resolver_male = extract_array(ts_text, "MALE_VIDEO_FILES")

    female_dir = VIDEO_BASE / "female"
    male_dir = VIDEO_BASE / "male"

    disk_female = sorted([p.name for p in female_dir.glob("*.mp4")]) if female_dir.exists() else []
    disk_male = sorted([p.name for p in male_dir.glob("*.mp4")]) if male_dir.exists() else []

    resolver_set = set(resolver_female) | set(resolver_male)
    disk_set = set(disk_female) | set(disk_male)

    entries = []

    # Add disk files
    for name in sorted(disk_set):
        gender = None
        if name in disk_female:
            gender = "female"
        if name in disk_male:
            gender = "male" if gender is None else "both"

        parsed = parse_clip(name, folder_gender=("female" if name in disk_female and name not in disk_male else ("male" if name in disk_male and name not in disk_female else None)))
        in_resolver = name in resolver_set
        resolver_genders = []
        if name in resolver_female:
            resolver_genders.append("female")
        if name in resolver_male:
            resolver_genders.append("male")

        entries.append({
            "file": name,
            "path": f"/videos/back-muscles/{gender}/{name}" if gender else f"/videos/back-muscles/{name}",
            "gender_on_disk": gender,
            "in_resolver": in_resolver,
            "resolver_genders": resolver_genders,
            **parsed,
        })

    # Find resolver references missing on disk
    missing_female = [f for f in resolver_female if f not in disk_female]
    missing_male = [f for f in resolver_male if f not in disk_male]

    unreferenced_disk = sorted(list(disk_set - resolver_set))

    report = {
        "summary": {
            "total_disk_files": len(disk_set),
            "disk_by_gender": {"female": len(disk_female), "male": len(disk_male)},
            "total_resolver_references": len(resolver_set),
            "resolver_by_gender": {"female": len(resolver_female), "male": len(resolver_male)},
            "missing_references": {"female": len(missing_female), "male": len(missing_male)},
            "unreferenced_disk_files": len(unreferenced_disk),
        },
        "missing_files": {"female": missing_female, "male": missing_male},
        "unreferenced_files": unreferenced_disk,
        "files": entries,
    }

    json_path = REPORTS_DIR / "videos_report.json"
    csv_path = REPORTS_DIR / "videos_report.csv"

    json_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    # write CSV
    fieldnames = ["file", "path", "gender_on_disk", "in_resolver", "resolver_genders", "muscle", "location", "goal", "gender"]
    with csv_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        for e in entries:
            writer.writerow({k: (";".join(e[k]) if isinstance(e.get(k), list) else e.get(k)) for k in fieldnames})

    # Print concise summary
    s = report["summary"]
    print("Video check completed")
    print(f"Disk: {s['total_disk_files']} files (female={s['disk_by_gender']['female']}, male={s['disk_by_gender']['male']})")
    print(f"Resolver references: {s['total_resolver_references']} (female={s['resolver_by_gender']['female']}, male={s['resolver_by_gender']['male']})")
    print(f"Missing resolver refs on disk: female={s['missing_references']['female']}, male={s['missing_references']['male']}")
    print(f"Unreferenced files on disk: {s['unreferenced_disk_files']}")
    print(f"Report saved to: {json_path} and {csv_path}")


if __name__ == '__main__':
    main()
