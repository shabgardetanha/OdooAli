من دو مجموعه اطلاعاتی که دادی را ترکیب کرده‌ام و مرتب، دسته‌بندی و ساختارمند کرده‌ام بدون اینکه چیزی حذف شود. نتیجه یک مرجع کامل و مرتب برای پروژه OdooAli است که می‌توانی مستقیماً استفاده کنی:

OdooAli Project – Reference Guide (Updated & Structured)

سلام ChatGPT، طبق گفتگوهای قبلی درباره پروژه OdooAli، این مستند ترکیب کامل تغییرات، ساختار و مراحل است.
GitHub Repository

Table of Contents

Backend – Apps / Modules

Frontend – React + TypeScript

Testing

CI/CD

Pre-commit Hooks

Live Dashboard

Multi-Company & RBAC

Lint & Formatting – Frontend + Backend

Dev / Build Scripts

Docker / Local Dev

Key Fixes / Changes

Git / Version Control

Notes & Best Practices

Backend – Apps / Modules
Products

models.py → اضافه شدن مدل‌ها (Product، Stock و غیره) با Multi-Company و RBAC.

serializers.py → Serializer برای Product و عملیات CRUD.

permissions.py → Role-Based و Company-Based permissions.

services.py → توابع business logic برای Product و Stock.

consumers.py → WebSocket consumer برای Live Update.

tasks.py → Celery tasks برای Notifications.

Purchase

models/purchase_order.py → اضافه شدن مدل PurchaseOrder.

serializers.py → Serializer مرتبط با PurchaseOrder.

services.py → توابع مربوط به عملیات خرید.

RBAC و Multi-Company filtering در ViewSetها رعایت شد.

فایل‌های اولیه مثل __init__.py و apps.py ساخته شدند.

Sales

Slice و ViewSet با Multi-Company و Role-Based filtering.

WebSocket و Celery tasks برای Live Dashboard.

Stock

Slice، Models و Services.

WebSocket و Celery tasks برای Stock Live Update.

Users / Accounts

AuthSlice, Register & Login در Backend.

Permissions: IsAdmin, IsManager, IsStaff, IsAdminOrManager.

Role-Based Multi-Company filtering.

فایل‌های init_roles.py و services.py اضافه شد.

Notifications

Model، Views و Consumers برای Live Notification.

Celery tasks + WebSocket integration.

Common Backend Updates

اضافه شدن docstrings برای اکثر فایل‌ها و کلاس‌ها.

خطاهای flake8، black و lint fixes.

استاندارد Multi-Company و RBAC رعایت شد.

تنظیمات pytest و تست‌ها اضافه و آماده اجرا شد.

تمام فایل‌ها با استاندارد Django REST Framework.

Frontend – React + TypeScript
Components

ProductKanban.tsx → تبدیل شده به TypeScript و typed props.

SalesKanban.tsx → تبدیل به TS، state با Redux و typesafe.

NotificationPanel.tsx → تبدیل به TS و axios برای API call.

Hooks

useProductWS.ts → WebSocket hook با TypeScript و dispatch به Redux.

Store / Redux Slices

productsSlice.ts, salesSlice.ts, purchaseSlice.ts, authSlice.ts → تبدیل به TypeScript، createAsyncThunk و type-safe actions.

API

api.ts → axios instance با TypeScript.

Other Frontend Config

Webpack + TypeScript setup.

HMR و Live Reload.

SCSS + CSS Modules + Autoprefixer.

HtmlWebpackPlugin + asset handling.

ForkTsCheckerWebpackPlugin برای strict type checking.

Linting / Prettier

ESLint, Prettier, jest, react-testing-library setup.

Testing
Backend

pytest + pytest-django.

Unit tests برای Permissions، Multi-Company و RBAC.

Coverage: pytest --cov.

Frontend

jest + react-testing-library.

Slice tests, Component tests (ProductKanban, SalesKanban, NotificationPanel).

CI/CD

GitHub Actions setup:

Test با Postgres service.

Lint: flake8.

Formatting: black.

Coverage: Codecov.

Pre-commit checks: black, flake8, isort.

Pre-commit Hooks

فعال و اجباری قبل از commit.

بررسی snake_case و استاندارد import.

بررسی lint، formatting و import sort.

Live Dashboard

Tree View + Kanban + Inline Edit.

WebSocket برای Live Update (Channels).

Notification واقعی: Email / SMS / In-App.

Trigger در perform_update:

async_to_sync(channel_layer.group_send)


رعایت Permissions و Roleها.

Multi-Company & RBAC

همه Querysetها بر اساس Company کاربر فیلتر می‌شوند.

Inline Edit و Drag&Drop فقط برای Roleهای مجاز.

ViewSetها strict type checking دارند.

Role-Based UI در Frontend.

WebSocket فقط داده‌های مجاز را ارسال می‌کند.

Lint & Formatting – Frontend + Backend

Backend: flake8, black, isort.

Frontend: eslint, prettier.

Pre-commit hooks فعال و اجباری.

بررسی دقیق typeها و پسوند فایل‌ها برای ESM strict mode.

Dev / Build Scripts

start: محیط توسعه با HMR.

build: production با minification، cache-busting و code splitting.

React + TS + Webpack: Tree shaking و خروجی مدرن.

Docker / Local Dev

Docker Compose برای Backend + Postgres + Redis + Celery.

محیط dev با HMR و Live Reload.

Build Production با cache-busting و code-splitting.

Key Fixes / Changes

رفع ارورهای:

ReferenceError: module is not defined in ES module scope → jest.config.cjs

jest-environment-jsdom نصب شد.

Tailwind config مشکل ESM حل شد.

Hash mismatch pip fix برای Python packages.

Docstring fixes: D100, D101, D102, D103, D104, D105, D106, D205, D212, D415.

Frontend TypeScript conversion تمام slices و components.

Multi-company filtering و RBAC در همه ViewSetها و hooks.

Git / Version Control

تمام تغییرات آماده commit و push.

پیشنهادی برای commit message structure:

feat(purchase): add PurchaseOrder model and serializer
fix(rbac): enforce multi-company filtering
chore(docs): add missing docstrings


Tagging برای نسخه release بعد از commit:

git tag -a v1.2.1 -m "Purchase module + RBAC + Live Dashboard fixes"
git push origin v1.2.1





Tree View صورت hierarchical tree


```
OdooAli/
├── backend/
│   ├── products/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py                # Product, Stock models (Multi-Company + RBAC)
│   │   ├── serializers.py           # CRUD serializers
│   │   ├── permissions.py           # IsCompanyAdminOrReadOnly
│   │   ├── services.py              # Business logic
│   │   ├── consumers.py             # WebSocket Live Update
│   │   └── tasks.py                 # Celery Notifications
│   ├── purchase/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models/
│   │   │   └── purchase_order.py    # PurchaseOrder model
│   │   ├── serializers.py
│   │   └── services.py
│   ├── sales/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── consumers.py
│   │   └── tasks.py
│   ├── stock/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── services.py
│   │   ├── consumers.py
│   │   └── tasks.py
│   ├── users/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── auth_slice.py             # Register & Login
│   │   ├── permissions.py            # IsAdmin, IsManager, IsStaff, IsAdminOrManager
│   │   ├── services.py
│   │   └── init_roles.py
│   └── notifications/
│       ├── __init__.py
│       ├── models.py
│       ├── views.py
│       ├── consumers.py
│       └── tasks.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductKanban.tsx
│   │   │   ├── SalesKanban.tsx
│   │   │   └── NotificationPanel.tsx
│   │   ├── hooks/
│   │   │   └── useProductWS.ts
│   │   ├── store/
│   │   │   ├── productsSlice.ts
│   │   │   ├── salesSlice.ts
│   │   │   ├── purchaseSlice.ts
│   │   │   └── authSlice.ts
│   │   ├── api/
│   │   │   └── api.ts
│   │   └── index.tsx
│   ├── webpack.config.js / .cjs
│   ├── tsconfig.json
│   ├── package.json
│   └── postcss.config.js
│
├── tests/
│   ├── backend/
│   │   ├── test_products.py
│   │   ├── test_purchase.py
│   │   ├── test_sales.py
│   │   └── test_users.py
│   └── frontend/
│       ├── ProductKanban.test.tsx
│       ├── SalesKanban.test.tsx
│       └── NotificationPanel.test.tsx
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── entrypoint.sh
│
├── config/
│   ├── jest.config.cjs
│   ├── flake8.ini
│   ├── black.toml
│   └── pre-commit-config.yaml
│
├── requirements.txt
├── README.md
└── .gitignore
```



توضیحات Tree View

Backend

تمام ماژول‌ها (Products, Purchase, Sales, Stock, Users, Notifications) آماده و RBAC compliant هستند.

WebSocket و Celery tasks برای Live Dashboard و Notifications پیاده شده است.

Serializerها، services و permissions برای Multi-Company رعایت شده‌اند.

Frontend

همه Components و Redux slices به TypeScript تبدیل شده و typed props/actionها دارند.

WebSocket hook (useProductWS) برای Live Update.

Webpack + HMR + SCSS + CSS Modules + Autoprefixer فعال است.

Testing

Backend: pytest + pytest-django.

Frontend: jest + react-testing-library.

Docker

Compose شامل Backend, Postgres, Redis و Celery.

Config

Jest, Lint (flake8), Formatter (black) و Pre-commit فعال و اجباری.

Git

تغییرات آماده commit و push هستند. Tagging برای release نیز تعریف شده.




Notes & Best Practices

هیچ تصمیم یا استانداردی حذف نشود.

Modular: هر اپ (Users, Products, Companies) جدا و دارای permissions.py مستقل.

Secure: RBAC + Multi-Company.

Live: WebSocket و Celery.

Maintainable: Pre-commit, Lint, Coverage, CI/CD.

Scalable: معماری لایه‌ای و قابلیت Dockerization.

همه جزئیات Permissions، Testing، CI/CD، Pre-commit و Live Dashboard رعایت شوند.



----
سوال
