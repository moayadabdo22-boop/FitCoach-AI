import subprocess, shutil, os, time
from pathlib import Path

repo = Path(r"D:\Ai Fit Coach\AI Fit Coach_publish_tmp3")
src = Path(r"D:\Ai Fit Coach\AI Fit Coach\ai_backend\datasets")
max_size = 50 * 1024 * 1024
skip_exts = {'.onnx','.pt','.pth','.h5','.zip','.tar','.gz','.tar.gz','.pkl','.mp4','.mp3','.wav','.bin','.ckpt','.exe','.dll'}
batch_size = 5

if not repo.exists() or not src.exists():
    print('Repo or source datasets path missing')
    raise SystemExit(1)

def run(cmd, cwd=repo, check=True):
    print('->', ' '.join(cmd))
    res = subprocess.run(cmd, cwd=str(cwd), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    print(res.stdout)
    if check and res.returncode != 0:
        raise RuntimeError(f'Command failed: {cmd}\n{res.stdout}')
    return res

# Reset to remote main
try:
    run(['git','fetch','origin'])
    run(['git','reset','--hard','origin/main'])
except Exception as e:
    print('Failed to reset to origin/main:', e)
    # continue anyway

# gather candidates
candidates = []
for p in src.rglob('*'):
    if p.is_file():
        try:
            s = p.stat().st_size
        except OSError:
            continue
        if s > max_size:
            continue
        if p.suffix.lower() in skip_exts:
            continue
        try:
            head = p.open('rb').read(4096)
            if b'version https://git-lfs.github.com/spec/v1' in head or b'oid sha256:' in head:
                continue
        except Exception:
            continue
        candidates.append(p)

candidates.sort(key=lambda p: p.stat().st_size)
print(f'candidates_count={len(candidates)}')

# push batches
pushed = 0
failed_batches = 0
for i in range(0, len(candidates), batch_size):
    batch = candidates[i:i+batch_size]
    batch_num = i//batch_size + 1
    print(f'Processing batch {batch_num} with {len(batch)} files')
    paths_to_add = []
    for p in batch:
        rel = p.relative_to(src.parent)  # preserves ai_backend/datasets/...
        # dest should be repo/samples/<rel>
        dest = repo / 'samples' / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, dest)
        paths_to_add.append(str(dest))

    # git add files
    try:
        run(['git','add'] + paths_to_add)
        run(['git','commit','-m', f'Add small datasets (batch {batch_num})'])
    except Exception as e:
        print('Commit failed for batch', batch_num, e)
        failed_batches += 1
        continue

    # push with retries
    success = False
    for attempt in range(1,4):
        try:
            print(f'Pushing batch {batch_num} attempt {attempt}')
            run(['git','push','origin','main'], check=True)
            success = True
            pushed += len(batch)
            break
        except Exception as e:
            print(f'Push attempt {attempt} failed: {e}')
            time.sleep(5 * attempt)
    if not success:
        print('Batch push failed after retries:', batch_num)
        failed_batches += 1
        break

print(f'Done. pushed_files={pushed}, failed_batches={failed_batches}')
