@echo off
echo ==========================================
echo AUTOMATED GIT SYNC SCRIPT
echo ==========================================

echo [1/5] Checking status...
git status

echo [2/5] Adding all files...
git add .

echo [3/5] Committing changes...
git commit -m "Nộp bài Ex50 hoàn chỉnh (Backend + Frontend)"

echo [4/5] Pulling latest changes from remote (Rebase)...
git pull origin main --rebase

echo [5/5] Pushing to GitHub...
git push origin main

echo ==========================================
echo DONE!
echo ==========================================
pause
