#!/bin/bash
set -e

# Colors for terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Naming according to operational checklist
MAIN_BRANCH="main"
NEW_BRANCH="feature/production-docker-nginx"
PATCH_FILE="odooali-production-docker.patch"
PR_TITLE="Setup production-ready feature/prod-monitor-logging-alert"
PR_BODY="Applied production-ready feature/prod-monitor-logging-alert."

echo -e "${YELLOW}Switching to $MAIN_BRANCH branch...${NC}"
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

echo -e "${YELLOW}Creating new branch $NEW_BRANCH...${NC}"
git checkout -b $NEW_BRANCH || git checkout $NEW_BRANCH

if [ -f "$PATCH_FILE" ]; then
    echo -e "${YELLOW}Applying patch $PATCH_FILE...${NC}"
    git apply --whitespace=fix "$PATCH_FILE" || echo -e "${RED}⚠️ Some changes could not be applied automatically. Check for .rej files.${NC}"
    
    echo -e "${YELLOW}Removing patch file $PATCH_FILE after applying...${NC}"
    rm "$PATCH_FILE"
else
    echo -e "${YELLOW}No patch file found. Continuing without applying patch.${NC}"
fi

git add .
git commit -m "$PR_TITLE" || echo -e "${YELLOW}Nothing to commit.${NC}"
git push -u origin $NEW_BRANCH || echo -e "${RED}Failed to push. Check remote repository.${NC}"

if command -v gh &> /dev/null; then
    echo -e "${YELLOW}Creating Pull Request on GitHub...${NC}"
    gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title "$PR_TITLE" --body "$PR_BODY" --web
else
    echo -e "${RED}⚠️ GitHub CLI not found. Pull Request not created automatically.${NC}"
    echo -e "You can create it manually using:"
    echo -e "gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title \"$PR_TITLE\" --body \"$PR_BODY\" --web"
fi

echo -e "${GREEN}✅ Script finished successfully!${NC}"
