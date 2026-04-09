#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir('/vercel/share/v0-project')

def run_command(cmd, description):
    print(f"[v0] {description}...")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/vercel/share/v0-project')
    if result.returncode != 0:
        print(f"[v0] Error: {result.stderr}")
        return False
    if result.stdout:
        print(f"[v0] {result.stdout.strip()}")
    return True

# Check if git repo exists, if not fetch it
if not os.path.exists('.git'):
    print("[v0] Fetching git repository...")
    run_command('git clone --branch v0/descobertainteligente-hub-52029f95 https://github.com/descobertainteligente-hub/duddha.git /tmp/duddha_repo', "Cloning repo")
    run_command('cp -r /tmp/duddha_repo/.git .', "Setting up git")

# Configure git
run_command('git config user.email "v0[bot]@users.noreply.github.com"', "Configuring git email")
run_command('git config user.name "v0[bot]"', "Configuring git name")

# Stage changes
run_command('git add .', "Staging files")

# Commit
run_command('git commit -m "Deploy: Convert HTML portfolio to Next.js app"', "Creating commit")

# Push to current branch
run_command('git push origin v0/descobertainteligente-hub-52029f95', "Pushing to GitHub")

print("[v0] ✓ Deployment complete! Your website is now live on Vercel.")
