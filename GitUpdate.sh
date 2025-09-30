#!/bin/bash
set -e

# 🌟 Colors for readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No color

# ⚙️ Settings
MAIN_BRANCH="main"
NEW_BRANCH="feature/production-docker"
PATCH_FILE="odooali-prod-fix.patch"
PR_TITLE="Add production-ready Docker & Nginx setup"
PR_BODY="Production Docker & Nginx setup applied via patch."

# 1️⃣ Switch to main branch and pull latest changes
echo -e "${YELLOW}Switching to $MAIN_BRANCH branch...${NC}"
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# 2️⃣ Create a new branch
echo -e "${YELLOW}Creating new branch $NEW_BRANCH...${NC}"
git checkout -b $NEW_BRANCH || git checkout $NEW_BRANCH

# 3️⃣ Check existing files before applying patch
if [ -f "$PATCH_FILE" ]; then
    echo -e "${YELLOW}Checking files for conflicts with patch...${NC}"
    
    # Extract file list from patch
    PATCH_FILES=$(grep "^\+\+\+ b/" "$PATCH_FILE" | sed 's/^\+\+\+ b\///')
    
    for FILE in $PATCH_FILES; do
        if [ -f "$FILE" ]; then
            read -p "$(echo -e "${RED}⚠️ $FILE already exists. Overwrite it with patch? (y/n) ${NC}")" yn
            case $yn in
                [Yy]* )
                    echo -e "${GREEN}✅ $FILE will be overwritten.${NC}"
                    ;;
                [Nn]* )
                    echo -e "${YELLOW}⏩ Skipping $FILE.${NC}"
                    # Remove the file from patch before applying
                    sed -i "/^\+\+\+ b\/$FILE$/,/^$/d" "$PATCH_FILE"
                    ;;
                * )
                    echo -e "${YELLOW}❌ Invalid input. Skipping $FILE.${NC}"
                    sed -i "/^\+\+\+ b\/$FILE$/,/^$/d" "$PATCH_FILE"
                    ;;
            esac
        fi
    done

    # Apply the patch
    echo -e "${YELLOW}Applying patch $PATCH_FILE...${NC}"
    git apply --whitespace=fix "$PATCH_FILE" || echo -e "${RED}⚠️ Some changes could not be applied automatically. Check for .rej files.${NC}"
else
    echo -e "${RED}❌ Patch file $PATCH_FILE not found!${NC}"
    exit 1
fi

# 4️⃣ Commit changes
git add .
git commit -m "$PR_TITLE"

# 5️⃣ Push new branch
git push -u origin $NEW_BRANCH

# 6️⃣ Create Pull Request using GitHub CLI
if command -v gh &> /dev/null; then
    echo -e "${YELLOW}Creating Pull Request on GitHub...${NC}"
    gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title "$PR_TITLE" --body "$PR_BODY" --web
else
    echo -e "${RED}⚠️ GitHub CLI not found. Pull Request not created automatically.${NC}"
    echo -e "You can create it manually using:"
    echo -e "gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title \"$PR_TITLE\" --body \"$PR_BODY\" --web"
fi

echo -e "${GREEN}✅ Script finished successfully!${NC}"
