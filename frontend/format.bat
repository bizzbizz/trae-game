@echo off
echo Running Prettier on frontend files...
npx --yes prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,html}"
echo Done!
pause