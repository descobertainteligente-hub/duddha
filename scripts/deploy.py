#!/usr/bin/env python3
import subprocess
import sys

def run_command(cmd, description):
    print(f"[v0] {description}...")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[v0] Error: {result.stderr}")
        return False
    print(f"[v0] Success: {result.stdout}")
    return True

# Configure git
run_command('git config user.email "v0[bot]@users.noreply.github.com"', "Configuring git email")
run_command('git config user.name "v0[bot]"', "Configuring git name")

# Stage changes
run_command('git add .', "Staging files")

# Commit
run_command('git commit -m "Deploy: Convert HTML portfolio to Next.js app"', "Creating commit")

# Push to current branch
run_command('git push', "Pushing to GitHub")

print("[v0] Deployment initiated! Vercel will automatically deploy your changes.")
