#!/usr/bin/env python3
"""
scripts/import_videos.py

Copy video files from a source folder into the project's public videos
directory and optionally update the frontend resolver lists in
`src/data/exerciseVideoResolver.ts`.

Usage:
  python scripts/import_videos.py --source "D:\\Ai Fit Coach\\tasks\\video\\videos" [--dry-run] [--no-update-resolver]

This script is a helper to be run locally on your machine where the
source videos exist. It will not attempt to download or fetch videos.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
from pathlib import Path
from typing import Iterable, Set, Tuple

VIDEO_EXTS = {".mp4", ".webm", ".mov", ".mkv", ".avi"}


def infer_gender_from_path(path: Path) -> str | None:
    text = str(path).lower()
    if "female" in text or "woman" in text or "women" in text:
        return "female"
    if "male" in text or "man" in text or "men" in text:
        return "male"
    # fallback to filename tokens
    name = path.name.lower()
    if "female" in name:
        return "female"
    if "male" in name:
        return "male"
    return None


def gather_video_files(source: Path) -> list[Path]:
    files: list[Path] = []
    for root, _, filenames in os.walk(source):
        for fn in filenames:
            p = Path(root) / fn
            if p.suffix.lower() in VIDEO_EXTS:
                files.append(p)
    return files


def copy_to_dest(src_files: Iterable[Path], dest_root: Path, dry_run: bool = False) -> list[Tuple[Path, Path, str]]:
    copied = []
    for src in src_files:
        gender = infer_gender_from_path(src) or "male"
        dest_dir = dest_root / gender
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / src.name
        if dest_path.exists():
            print(f"Exists: {dest_path} - skipping")
            continue
        print(f"Copying: {src} -> {dest_path}")
        if not dry_run:
            shutil.copy2(src, dest_path)
        copied.append((src, dest_path, gender))
    return copied


def _extract_array_items(block: str) -> list[str]:
    return re.findall(r"['\"]([^'\"]+)['\"]", block)


def update_resolver_ts(resolver_path: Path, female_files: Set[str], male_files: Set[str]) -> bool:
    text = resolver_path.read_text(encoding="utf-8")

    def replace_array(name: str, new_items: Set[str], content: str) -> Tuple[str, bool]:
        pattern = rf"(const {name} = \[)([\s\S]*?)(\]\s*as const;)"
        m = re.search(pattern, content)
        if not m:
            print(f"Warning: could not find array {name} in {resolver_path}")
            return content, False

        prefix, body, suffix = m.group(1), m.group(2), m.group(3)
        existing = set(_extract_array_items(body))
        updated = sorted(existing.union(new_items))
        new_body = "\n  " + ",\n  ".join([f"'{it}'" for it in updated]) + "\n"
        new_block = prefix + new_body + suffix
        new_content = content[: m.start()] + new_block + content[m.end():]
        return new_content, True

    changed = False
    text, ok1 = replace_array("FEMALE_VIDEO_FILES", female_files, text)
    text, ok2 = replace_array("MALE_VIDEO_FILES", male_files, text)
    if (ok1 or ok2) and text:
        resolver_path.write_text(text, encoding="utf-8")
        changed = True
        print(f"Updated resolver file: {resolver_path}")
    else:
        print("No updates applied to resolver file.")
    return changed


def main() -> None:
    parser = argparse.ArgumentParser(description="Import exercise videos into the repo and update resolver")
    parser.add_argument("--source", required=True, help="Source root folder where videos are organized")
    parser.add_argument("--dest", default=None, help="Destination root inside repo (defaults to public/videos/back-muscles)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be copied without copying")
    parser.add_argument("--no-update-resolver", action="store_true", help="Do not modify src/data/exerciseVideoResolver.ts")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    source = Path(args.source).resolve()
    if not source.exists():
        print(f"Source folder does not exist: {source}")
        return

    dest_root = Path(args.dest).resolve() if args.dest else repo_root / "public" / "videos" / "back-muscles"
    resolver_path = repo_root / "src" / "data" / "exerciseVideoResolver.ts"

    print(f"Scanning source: {source}")
    found = gather_video_files(source)
    print(f"Found {len(found)} video files")

    copied = copy_to_dest(found, dest_root, dry_run=args.dry_run)
    print(f"Copied {len(copied)} files to {dest_root}")

    # Prepare sets of filenames to add to resolver
    female_set = {p.name for (_, p, g) in copied if g == "female"}
    male_set = {p.name for (_, p, g) in copied if g == "male"}

    if not args.no_update_resolver and resolver_path.exists():
        print("Updating resolver lists in src/data/exerciseVideoResolver.ts...")
        update_resolver_ts(resolver_path, female_set, male_set)
    else:
        if args.no_update_resolver:
            print("Skipping resolver update (requested)")
        else:
            print(f"Resolver file not found at {resolver_path}; skipping update")

    print("Done.")


if __name__ == "__main__":
    main()
