import subprocess
from pathlib import Path
import shutil

repo = Path(r"D:\Ai Fit Coach\AI Fit Coach_publish_tmp3")
samples = repo / 'samples'
moved = []
skipped = []

for p in samples.rglob('*'):
    if p.is_file():
        rel = p.relative_to(samples)
        parts = rel.parts
        if parts[0] == 'ai_backend':
            target = repo / Path(*parts)
        elif parts[0] == 'datasets':
            target = repo / 'ai_backend' / rel
        elif parts[0] == 'voice':
            target = repo / 'ai_backend' / rel
        else:
            # also consider samples/datasets placed directly under samples (e.g., samples/datasets/...)
            if parts[0] in ('datasets','ai_backend'):
                target = repo / 'ai_backend' / rel
            else:
                continue

        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists():
            skipped.append(str(rel))
            continue
        # move file
        shutil.move(str(p), str(target))
        moved.append((str(rel), str(target.relative_to(repo))))

# clean up empty sample directories
for d in sorted(samples.rglob('*'), key=lambda x: -len(str(x))):
    try:
        if d.is_dir() and not any(d.iterdir()):
            d.rmdir()
    except Exception:
        pass

print('moved_count=', len(moved))
if moved:
    for a,b in moved[:20]:
        print('moved', a, '->', b)
print('skipped_count=', len(skipped))

# git add/move via filesystem changes: use git add -A
subprocess.run(['git', 'add', '-A'], cwd=str(repo))
ret = subprocess.run(['git', 'commit', '-m', 'Move sample dataset/voice files into original ai_backend paths'], cwd=str(repo))
print('commit rc=', ret.returncode)
if ret.returncode == 0:
    subprocess.run(['git', 'push', 'origin', 'main'], cwd=str(repo))
else:
    print('No commit made (maybe nothing changed)')
