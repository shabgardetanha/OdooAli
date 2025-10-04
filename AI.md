

# OdooAli Project – Reference Guide

سلام ChatGPT، طبق گفتگو قبلی درباره پروژه OdooAli، لطفاً تمام پاسخ‌ها دقیقاً مطابق تصمیمات و ساختارهای این راهنما باشند.

https://github.com/shabgardetanha/OdooAli
---

# OdooAli Project Wiki

## Table of Contents
1. [Permissions & Role-Based Access](#permissions--role-based-access)
2. [Testing](#testing)
3. [CI/CD (GitHub Actions)](#cicd-github-actions)
4. [Pre-commit Hooks](#pre-commit-hooks)
5. [Live Dashboard](#live-dashboard)
6. [Multi-Company & RBAC](#multi-company--rbac)
7. [Frontend – React + TypeScript + Webpack](#frontend--react--typescript--webpack)
8. [Lint & Formatting – Frontend + Backend](#lint--formatting--frontend--backend)
9. [Dev / Build Scripts](#dev--build-scripts)
10. [Notes & Best Practices](#notes--best-practices)

---

## Permissions & Role-Based Access
- **Files & Classes:**
  - `products/permissions.py`: `IsCompanyAdminOrReadOnly`
  - `users/permissions.py`: `IsAdmin`, `IsManager`, `IsStaff`, `IsAdminOrManager`
- **ViewSets:**
  - `ProductViewSet` ترکیب `permission_classes` و `get_queryset` برای Multi-Company و Role-Based Access
  - فیلتر محصولات بر اساس `self.request.user.company`
  - Inline Edit و Drag&Drop فقط برای Roleهای مجاز
- Strict type checking فعال

---

## Testing
- **Backend:** `pytest` + `pytest-django`
  - Unit Test برای Roleها و Companyها
  - تست Permissions و Querysetهای شرکت کاربر
- **Frontend:** `jest` + `react-testing-library`
- **Coverage:** ارسال به Codecov
- **Pre-commit hooks:** قبل از Commit، اجرای اتوماتیک تست‌ها

---

## CI/CD (GitHub Actions)
- اجرای تست‌ها روی **Postgres Service**
- Lint: `flake8`
- Formatting: `black`
- Coverage: `pytest --cov`
- Pre-commit checks:
  - `pre-commit`, `black`, `flake8`, `isort`
- اجرای خودکار Pipeline روی Pull Request

---

## Pre-commit Hooks
- فعال‌سازی:
  ```bash
  pre-commit install
بررسی:

Lint: flake8

Formatting: black

Import Sort: isort

اطمینان از snake_case و استاندارد importها

اجباری قبل از Commit

Live Dashboard
Tree View + Kanban + Inline Edit

WebSocket برای Live Update (Channels)

Notification واقعی: Email / SMS / In-App

Trigger در perform_update:

python
Copy code
async_to_sync(channel_layer.group_send)
رعایت Permissions و Roleها

Multi-Company & RBAC
همه Querysetها بر اساس Company کاربر فیلتر می‌شوند

Inline Edit و Drag&Drop فقط برای Roleهای مجاز

ViewSetها strict type checking دارند

Frontend – React + TypeScript + Webpack
HMR و Live Reload

پشتیبانی از JSX / TSX، SCSS و فایل‌های رسانه‌ای

Aliasها مطابق frontend/src:

RBAC, Store, Pages, Components, Common

Babel:

پشتیبانی کامل از JS/TS/JSX/TSX، کلاس‌ها، optional chaining، runtime helpers

PostCSS + Autoprefixer: CSS حرفه‌ای و ریسپانسیو

SCSS + CSS Modules: style-loader, MiniCssExtractPlugin, autoprefixer

Asset Handling: تصاویر و SVG با loader مناسب

HtmlWebpackPlugin: meta, favicon, template (frontend/src/index.ejs)

DevServer: HMR و SPA fallback

Optimization (Production): splitChunks, runtimeChunk, minification, cache-busting

Type Checking: ForkTsCheckerWebpackPlugin جدا از Babel

Strict Mode، include/exclude تست‌ها و utils، allowJs: true، sourceMap: true

React 17+: jsx: react-jsx، module: ESNext برای tree-shaking

Lint & Formatting – Frontend + Backend
Backend: flake8, black, isort

Frontend: eslint, prettier

Pre-commit hooks فعال و اجباری

استاندارد importها و snake_case برای همه ماژول‌ها

بررسی دقیق typeها و پسوند فایل‌ها برای ESM strict mode

Dev / Build Scripts
start: محیط توسعه با HMR

build: production با minification، cache-busting و code splitting

React + TS + Webpack: Tree shaking و خروجی مدرن

Notes & Best Practices
هیچ تصمیم یا استانداردی حذف نشود

همه جزئیات Permissions، Testing، CI/CD، Pre-commit و Live Dashboard رعایت شوند



خلاصه معماری پروژه OdooAli
1️⃣ لایه‌ها (Layers)
1.	Frontend (UI Layer)
o	React یا هر فریمورک SPA مشابه
o	Tree View + Kanban + Inline Edit
o	Live Update با WebSocket
o	Role-Based UI: نمایش و ویرایش اجزاء بسته به Role و Company
2.	Backend (Business Logic Layer)
o	Django + Django REST Framework (DRF)
o	ViewSetها با:
	Permissionها: Role-Based و Company-Based
	Queryset فیلتر شده بر اساس Company کاربر
o	WebSocket (Django Channels) برای Live Dashboard
o	Celery برای Notifications (Email/SMS/In-App)
o	Multi-Company Support با ForeignKey به Company
o	Role-Based Access Control (RBAC) در سطح مدل و ViewSet
3.	Database Layer
o	PostgreSQL
o	مدل‌ها:
	Company: تعریف شرکت‌ها
	User: با Role و شرکت مرتبط
	Product: با Company ForeignKey و Price/Stock
o	Simple History برای ثبت تغییرات و دلایل تغییر (update_change_reason)
________________________________________
2️⃣ CI/CD و Quality Layer
•	GitHub Actions برای:
o	اجرای Unit Test با pytest
o	Code Coverage و گزارش به Codecov
o	Lint و Formatting (flake8 + black)
•	Pre-commit Hooks:
o	black، flake8، isort قبل از Commit
•	اطمینان از کیفیت، یکپارچگی و عدم Regression
________________________________________
3️⃣ Live Features
•	WebSocket Channels:
o	Live Update محصولات در Tree/Kanban/Inline Edit
o	ارسال Notification هنگام تغییر Price یا Stock
•	Inline Edit و Drag&Drop فقط برای Roleهای مجاز
•	Multi-Company: کاربران فقط داده‌های شرکت خود را می‌بینند
________________________________________
4️⃣ معماری Permission & Role
لایه	Responsibility
Model	Company و Role به Product و User مرتبط
ViewSet	ترکیب permission_classes و get_queryset برای کنترل دسترسی
Frontend	نمایش اجزاء UI بر اساس Role و Company
WebSocket	ارسال Live Update فقط برای داده‌های مجاز کاربر
________________________________________
5️⃣ Docker / محیط توسعه
•	Docker Compose (اختیاری)
•	Backend + Postgres + Redis + Celery
•	قابلیت توسعه مستقل و تست Local / Prod
________________________________________
6️⃣ خلاصه جریان عملیاتی (Flow)
1.	کاربر با Role و Company وارد سیستم می‌شود
2.	Frontend اجزاء مجاز (Tree/Kanban/Inline Edit) را نمایش می‌دهد
3.	تغییرات محصولات → Backend → ذخیره → ارسال WebSocket → Live Update Dashboard
4.	Notificationها توسط Celery به کاربر ارسال می‌شود
5.	تست‌ها و Quality Check در CI/CD اجرا می‌شوند
________________________________________
💡 ویژگی‌های کلیدی معماری
•	Modular: هر اپ (Users, Products, Companies) جدا و دارای permissions.py مستقل
•	Secure: RBAC + Multi-Company
•	Live: WebSocket و Celery
•	Maintainable: Pre-commit, Lint, Coverage, CI/CD
•	Scalable: معماری لایه‌ای و قابلیت Dockerization



⚡ نکته مهم:

هیچ تصمیم یا استانداردی از این راهنما حذف نشود.

پاسخ‌ها دقیقاً طبق همین تصمیمات، کلاس‌ها، تست‌ها و Workflowها باشد.

همه جزئیات Permissions، Testing، CI/CD، Pre-commit و Live Dashboard رعایت شوند.



---

مرحله یا سوال جدید:
[توضیح مرحله یا قابلیت جدید اینجا وارد شود]
