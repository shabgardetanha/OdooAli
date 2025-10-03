#!/bin/bash
set -e

# ⚙️ تنظیمات
MAIN_BRANCH="main"
NEW_BRANCH="feature/production-docker"
PATCH_FILE="odooali-prod-fix.patch"
PR_TITLE="Add production-ready Docker & Nginx setup"
PR_BODY="Production Docker & Nginx setup applied via patch."

# 1️⃣ رفتن به شاخه اصلی و Pull گرفتن آخرین تغییرات
echo "Switching to $MAIN_BRANCH branch..."
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# 2️⃣ ساخت شاخه جدید
echo "Creating new branch $NEW_BRANCH..."
git checkout -b $NEW_BRANCH || git checkout $NEW_BRANCH

# 3️⃣ بررسی فایل‌های موجود قبل از اعمال پچ
if [ -f "$PATCH_FILE" ]; then
    echo "Checking files for conflicts with patch..."

    # استخراج لیست فایل‌ها از پچ
    PATCH_FILES=$(grep "^\+\+\+ b/" "$PATCH_FILE" | sed 's/^\+\+\+ b\///')

    for FILE in $PATCH_FILES; do
        if [ -f "$FILE" ]; then
            read -p "⚠️ $FILE already exists. Overwrite it with patch? (y/n) " yn
            case $yn in
                [Yy]* )
                    git checkout -- "$FILE"
                    echo "✅ $FILE reset."
                    ;;
                [Nn]* )
                    echo "⏩ Skipping $FILE."
                    ;;
                * )
                    echo "❌ Invalid input, skipping $FILE."
                    ;;
            esac
        fi
    done

    # اعمال پچ
    echo "Applying patch $PATCH_FILE..."
    git apply "$PATCH_FILE" || echo "⚠️ Some changes could not be applied automatically. Check for .rej files."
else
    echo "❌ Patch file $PATCH_FILE not found!"
    exit 1
fi

# 4️⃣ Commit تغییرات
git add .
git commit -m "$PR_TITLE"

# 5️⃣ Push شاخه جدید
git push -u origin $NEW_BRANCH

# 6️⃣ ساخت Pull Request (نیاز به GitHub CLI)
if command -v gh &> /dev/null; then
    echo "Creating Pull Request on GitHub..."
    gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title "$PR_TITLE" --body "$PR_BODY" --web
else
    echo "⚠️ GitHub CLI not found. Pull Request not created automatically."
    echo "You can create it manually: gh pr create --base $MAIN_BRANCH --head $NEW_BRANCH --title \"$PR_TITLE\" --body \"$PR_BODY\" --web"
fi

echo "✅ Script finished successfully!"
