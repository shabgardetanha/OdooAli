<div dir="auto">

# سیستم انبارداری ساده (Simple Warehouse Management System)

## توضیح (Description)  
سیستم انبارداری ساده‌ای مبتنی بر Django ، PostgreSQL ، Tailwind CSS و Pandas. این سیستم امکان مدیریت محصولات، ورود/خروج موجودی و نمایش گزارش‌ها را فراهم می‌کند

---

## 📥 اجرای پروژه 
### ۱. کلون کردن پروژه از GitHub
```bash
git clone https://github.com/your-username/OdooAli.git
cd 
docker-compose -u bulit
```

## 📥 ایجاد پروژه از صفر با داکر


```
F:\VsProject\OdooAli\
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── OdooALI/
frontend/
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx        # نقطه ورود React
│   ├── App.jsx         # کامپوننت اصلی
│   ├── index.css       # استایل اصلی Tailwind
│   ├── components/
│   │   └── Header.jsx
│   └── pages/
│       └── Home.jsx
├── nginx/
│   └── default.conf
├── .env
└── docker-compose.prod.yml
```


#### ۳.۱ ایجاد فایل ها


# 1️⃣ backend/requirements.txt
```
Django>=4.2
djangorestframework
psycopg2-binary
djangorestframework-simplejwt
```

# 2️⃣ backend/Dockerfile.prod
```
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "OdooALI.wsgi:application", "--bind", "0.0.0.0:8000"]
```

# 3️⃣ frontend/package.json
```
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.5",
    "@reduxjs/toolkit": "^1.9.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "vite": "^4.5.0",
    "@vitejs/plugin-react": "^3.0.0",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.18"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

# 4️⃣ frontend/vite.config.js
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

# 5️⃣ frontend/tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# 6️⃣ frontend/postcss.config.js
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

# 7️⃣ frontend/Dockerfile.prod
```
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

# 8️⃣ nginx.conf
```
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://web:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

# 9️⃣ docker-compose.prod.yml
```
version: '3.9'

services:
  db:
    image: postgres:15
    container_name: odooali_db
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    restart: unless-stopped

  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    container_name: odooali_web
    env_file:
      - .env
    volumes:
      - ./backend:/app
    expose:
      - "8000"
    depends_on:
      - db
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    container_name: odooali_frontend
    expose:
      - "80"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: odooali_nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - web
      - frontend
    restart: unless-stopped

volumes:
  postgres_data:
```

# 10 .env
```
POSTGRES_DB=odooali
POSTGRES_USER=ali
POSTGRES_PASSWORD=000000
POSTGRES_HOST=db
POSTGRES_PORT=5432
DEBUG=1
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=*
```

# 11 .gitignore
```
.# ---- Python ----
__pycache__/
*.py[cod]
*.pyo
*.pyd
*.pdb
*.egg
*.egg-info/
dist/
build/
.eggs/
pip-wheel-metadata/
*.manifest
*.spec

# ---- Django ----
*.log
db.sqlite3
media/
staticfiles/
.env
.env.*

# ---- Virtualenv ----
venv/
env/
.venv/
ENV/
env.bak/
venv.bak/

# ---- IDE ----
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# ---- OS ----
.DS_Store
Thumbs.db

# ---- Docker ----
/postgres_data/
/*.pid

# ---- Node / Tailwind ----
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.pnp.*
coverage/
.cache/
.parcel-cache/
.theme/node_modules/
theme/node_modules/

# ---- Compiled CSS / JS ----
*.min.css
*.min.js
*.map
*.lock

# ---- Other ----
*.bak
*.swp
*.swo
```



# 11️⃣ مراحل راه‌اندازی از صفر
1. ساخت پروژه Django با اسم OdooALI:
```bash
cd backend
django-admin startproject OdooALI .
```
2. نصب وابستگی‌ها:
```bash
pip install -r requirements.txt
```
3. مهاجرت دیتابیس و ایجاد superuser:
```bash
docker-compose -f docker-compose.prod.yml run web python manage.py migrate
docker-compose -f docker-compose.prod.yml run web python manage.py createsuperuser
```


3️⃣ ساخت build React

داخل پوشه frontend (روی هاست):

```cd frontend
npm install      # اگر هنوز نصب نکردی
npm run build
```


4. Build و اجرای کانتینرها:
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```
5. بعد از بالا آمدن کانتینرها:
- Frontend روی http://localhost/
- Backend API روی http://localhost/api/







---
از اینجا به بعد نسخه بدون داکر حساب میشود و چون وقت نیست مرتب نکردم
ساخت پروژه Django

```bash
docker-compose run django django-admin startproject OdooAli .
```




### 2.3 تنظیمات دیتابیس PostgreSQL در settings.py

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "mydb",
        "USER": "myuser",
        "PASSWORD": "mypassword",
        "HOST": "db",
        "PORT": "5432",
    }
}

STATICFILES_DIRS = [
    BASE_DIR / "static",
]
```


### 2.2 تنضیمات settings.py
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'OdooALi',
]
```


## ۵. فعال کردن Tailwind CSS

```bash
docker-compose run django python manage.py tailwind init theme
```

داخل فولدر theme

```
cd theme/
docker-compose run django npm install --prefix theme

```


### ۴. انجام میگریشن (برای اولین اجرای پروژه)
```bash
docker exec -it django bash

docker exec -it django python manage.py makemigrations
docker exec -it django python manage.py migrate
```
### ساخت سوپر یوزر

```bash
docker exec -it django python manage.py createsuperuser  
```


## گام 3: ساخت جداول دیتابیس (Models)
### 3.1 تعریف مدل‌ها در warehouse/models.py


```python
from django.db import models
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="نام محصول")
    current_stock = models.IntegerField(default=0, verbose_name="موجودی فعلی")
    reorder_level = models.IntegerField(default=0, verbose_name="حداقل موجودی برای تامین")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="تاریخ ساخت")

    def __str__(self):
        return self.name

class StockMovement(models.Model):
    MOVEMENT_TYPES = [('in', 'ورود'), ('out', 'خروج')]
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="محصول")
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_TYPES, verbose_name="نوع حركة")
    quantity = models.IntegerField(verbose_name="مقدار")
    timestamp = models.DateTimeField(default=timezone.now, verbose_name="تاریخ/زمان")
    description = models.TextField(blank=True, verbose_name="توضیحات")

    def __str__(self):
        return f"{self.product.name} - {self.movement_type} ({self.quantity})"

```

## گام 4: فرم‌های ورودی (Forms)
### 4.1 تعریف فرم‌ها در warehouse/forms.py
```python
from django import forms
from .models import Product, StockMovement

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'current_stock', 'reorder_level']
        labels = {
            'name': 'نام محصول',
            'current_stock': 'موجودی فعلی',
            'reorder_level': 'حداقل موجودی برای تامین',
        }

class StockMovementForm(forms.ModelForm):
    class Meta:
        model = StockMovement
        fields = ['product', 'movement_type', 'quantity', 'description']
        labels = {
            'product': 'محصول',
            'movement_type': 'نوع حركة',
            'quantity': 'مقدار',
            'description': 'توضیحات',
        }

    def clean_quantity(self):
        quantity = self.cleaned_data['quantity']
        if quantity <= 0:
            raise forms.ValidationError("مقدار باید بیش از صفر باشد.")
        return quantity
```

## گام 5: ویوها (Views)
### 5.1 تعریف ویوها در warehouse/views.

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Product, StockMovement
from .forms import ProductForm, StockMovementForm
import pandas as pd
from django.db.models import F
from django.utils import timezone
from datetime import timedelta

def home(request):
    products = Product.objects.all()
    low_stock_products = Product.objects.filter(current_stock__lt=F('reorder_level'))

    # تجزیه و تحلیل حركات ۷روز گذشته با Pandas
    week_ago = timezone.now() - timedelta(days=7)
    recent_movements = StockMovement.objects.filter(timestamp__gte=week_ago).order_by('-timestamp')
    df = pd.DataFrame(list(recent_movements.values(
        'product__name', 'movement_type', 'quantity', 'timestamp', 'description'
    )))
    df['timestamp'] = df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')  # تبدیل زمان به رشته
    movement_report = df.to_html(index=False, classes="min-w-full divide-y divide-gray-200") if not df.empty else "هیچ حركة اخیری یافت نشد."

    context = {
        'products': products,
        'low_stock_products': low_stock_products,
        'movement_report': movement_report,
    }
    return render(request, 'home.html', context)

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'محصول جدید با موفقیت افزوده شد.')
            return redirect('home')
    else:
        form = ProductForm()
    return render(request, 'add_product.html', {'form': form})

def edit_stock(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        form = StockMovementForm(request.POST)
        if form.is_valid():
            movement = form.save(commit=False)
            movement.product = product

            # بروزرسانی موجودی محصول
            if movement.movement_type == 'in':
                product.current_stock += movement.quantity
            else:
                product.current_stock -= movement.quantity

            # احراز هشدار برای موجودی منفی
            if product.current_stock < 0:
                product.current_stock += movement.quantity  # لغو تغییر
                messages.error(request, 'موجودی نمیتواند منفی شود!')
                form = StockMovementForm(initial={'product': product})  # فرم را با اطلاعات فعلی بار کن
                return render(request, 'edit_stock.html', {'form': form, 'product': product})

            product.save()
            movement.save()
            messages.success(request, 'موجودی محصول بروزرسانی شد.')
            return redirect('home')
    else:
        form = StockMovementForm(initial={'product': product})
    return render(request, 'edit_stock.html', {'form': form, 'product': product})

def movement_history(request):
    movements = StockMovement.objects.all().order_by('-timestamp')
    return render(request, 'movement_history.html', {'movements': movements})
```



## گام 6: تعریف URL‌ها
### 6.1 تنظیمات URL در OdooAli/urls.py


```PYTHON
from django.contrib import admin
from django.urls import path
from warehouse import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('add_product/', views.add_product, name='add_product'),
    path('edit_stock/<int:product_id>/', views.edit_stock, name='edit_stock'),
    path('movement_history/', views.movement_history, name='movement_history'),
]
```

## گام 7: ساخت قالب‌های HTML (Templates)
### 7.1 قالب اصلی templates/home.html


```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>انبارداری ساده</title>
    {% load static %}
    <link href="{% static 'css/output.css' %}" rel="stylesheet">
</head>
<body class="p-4 bg-gray-100">
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">مدیریت انبار</h1>

        <!-- هشدار موجودی کمبودی -->
        <div class="mb-4">
            <h2 class="text-xl font-semibold text-red-600">محصولات کمبودی (نیاز به تامین):</h2>
            <ul>
                {% for product in low_stock_products %}
                    <li class="px-4 py-2 bg-red-100 rounded-lg mb-2">
                        {{ product.name }} - موجودی: {{ product.current_stock }} (حداقل: {{ product.reorder_level }})
                    </li>
                {% empty %}
                    <li class="px-4 py-2 bg-green-100 rounded-lg">هیچ محصول کمبودی وجود ندارد!</li>
                {% endfor %}
            </ul>
        </div>

        <!-- لیست محصولات -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">لیست محصولات:</h2>
            <div class="flex flex-col mt-4">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نام محصول</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">موجودی فعلی</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {% for product in products %}
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">{{ product.current_stock }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <a href="{% url 'edit_stock' product.id %}"
                                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                                ویرایش موجودی
                                            </a>
                                        </td>
                                    </tr>
                                    {% endfor %}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <a href="{% url 'add_product' %}" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">+ محصول جدید افزود</a>
            </div>
        </div>

        <!-- گزارش حركات ۷روز گذشته -->
        <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">گزارش حركات ۷روز گذشته:</h2>
            <div class="bg-white p-4 rounded-lg">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نام محصول</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نوع حركة</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">مقدار</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">توضیحات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{ movement_report|safe }}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

### 7.2 قالب افزودن محصول templates/add_product.html

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>افزودن محصول</title>
    {% load static %}
    <link href="{% static 'css/output.css' %}" rel="stylesheet">
</head>
<body class="p-4 bg-gray-100">
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">افزودن محصول جدید</h1>
        <form method="post" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {% csrf_token %}
            {{ form.as_p }}
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                افزودن
            </button>
            <a href="{% url 'home' %}" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-3">
                بازگشت
            </a>
        </form>
    </div>
</body>
</html>
```

### 7.3 قالب ویرایش موجودی templates/edit_stock.html

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ویرایش موجودی {{ product.name }}</title>
    {% load static %}
    <link href="{% static 'css/output.css' %}" rel="stylesheet">
</head>
<body class="p-4 bg-gray-100">
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">ویرایش موجودی {{ product.name }}</h1>
        <form method="post" class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {% csrf_token %}
            <input type="hidden" name="product" value="{{ product.id }}">
            
            <!-- نوع حركة -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">نوع حركة:</label>
                <select name="movement_type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-500">
                    <option value="in" {% if form.movement_type.value == 'in' %}selected{% endif %}>ورود</option>
                    <option value="out" {% if form.movement_type.value == 'out' %}selected{% endif %}>خروج</option>
                </select>
            </div>

            <!-- مقدار -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">مقدار:</label>
                <input type="number" name="quantity" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-500" 
                    value="{{ form.quantity.value }}" required>
            </div>

            <!-- توضیحات -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">توضیحات:</label>
                <textarea name="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-500"></textarea>
            </div>

            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                بروزرسانی موجودی
            </button>
            <a href="{% url 'home' %}" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-3">
                بازگشت
            </a>
        </form>
    </div>
</body>
</html>
```

### 7.4 قالب گزارش حركات templates/movement_history.html

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ประวัตិ حركات</title>
    {% load static %}
    <link href="{% static 'css/output.css' %}" rel="stylesheet">
</head>
<body class="p-4 bg-gray-100">
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">ประวัตិ حركات موجودی</h1>
        <div class="bg-white p-4 rounded-lg">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نام محصول</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نوع حركة</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">مقدار</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">توضیحات</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {% for movement in movements %}
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">{{ movement.product.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ movement.get_movement_type_display }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ movement.quantity }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ movement.timestamp|date:"Y-m-d H:i:s" }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ movement.description }}</td>
                        </tr>
                        {% empty %}
                        <tr>
                            <td colspan="5" class="px-6 py-4 text-center text-gray-600">هیچ حركة موجودی ثبت نشده است.</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt-4">
            <a href="{% url 'home' %}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                بازگشت به صفحه اصلی
            </a>
        </div>
    </div>
</body>
</html>
```


### 12. اجرای پروژه
```bash
docker-compose up --build
```


### ۳. دسترسی به سیستم

صفحه اصلی: http://localhost:8000

پنل ادمین: http://localhost:8000/admin 

افزودن محصول جدید: http://localhost:8000/add_product

گزارش حركات: http://localhost:8000/movement_history


### 13. Git
یک ریپو در GitHub بساز.

```bash
git config --global user.name "shabgardetanha"

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/shabgardetanha/OdooAli.git
git push -u origin main
```

## بخش‌های پروژه (Project Structure)

پروژه شما ممکنه به شکل زیر باشه:

```
myproject/
OdooAli/
│
├── .env
├── docker-compose.prod.yml
├── Dockerfile.prod
├── nginx.conf
├── README.md
│
├── backend/
│   ├── requirements.txt
│   ├── manage.py
│   ├── myproject/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── app1/
│       ├── __init__.py
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       └── urls.py
│
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── Dockerfile.prod
    └── src/
        ├── index.js
        ├── App.js
        ├── utils/
        │   └── api.js
        ├── pages/
        │   ├── Login.js
        │   ├── Dashboard.js
        │   └── Home.js
        ├── components/
        │   └── ProtectedRoute.js
        └── store/
            ├── store.js
            └── authSlice.js
```


## توضیحات اضافه (Extras)
🔍 مدل‌ها (Models)

دو مدل اصلی برای پروژه تعریف شده‌اند:

Product: مدیریت اطلاعات محصول (نام، موجودی فعلی، حداقل موجودی).

StockMovement: پذیرش حركات ورود/خروج محصول (مقدار، زمان، توضیحات).











## مستقیم بدون داکر
## گام 1: نصب ابزارها (Installation & Setup)  


### 1.1 نصب Python و Django
```
pip install django psycopg2-binary
```

### 1.2 نصب PostgreSQL

[برای ویندوز PostgreSQL ](/https://www.postgresql.org/download/)



### ۱. ایجاد و تنظیم دیتابیس PostgreSQL  
اول، دیتابیس را برای پروژه ایجاد کنید:  



# ساخت دیتابیس مثال: OdooAli_db
```BASH
CREATE DATABASE OdooAli_db;
```
# ساخت کاربر دیتابیس (اگر لازم باشه)

```
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
ALTER ROLE your_db_user SET client_encoding TO 'utf8';
ALTER ROLE your_db_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE your_db_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE warehouse_db TO your_db_user;
\q  # خروج از shell
```






## گام 8: ایجاد سوپر یوزر و اجرای پروژه
### ۱. ایجاد سوپر یوزر (مدیر سیستم)

```bash
python manage.py createsuperuser
```
وارد نام کاربری (مثال: admin)، ایمیل و پسورد بگذارید.

### ۲. اجرای سرویس Django
```
python manage.py runserver
```

سرویس در http://localhost:8000 شروع می‌شود.



### 1.3 نصب Tailwind CSS

```bash
mkdir -p static/css static/js templates

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p  

npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch
```


برای اتصال Django به دیتابیس PostgreSQL در کانتینر، در فایل OdooAli/settings.py، جایگزینی DATABASES با این کد:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME', 'warehouse_db'),
        'USER': os.environ.get('POSTGRES_USER', 'your_db_user'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'your_db_password'),
        'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),  # در docker-compose، HOST 'db' هست
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
    }
}
```






```bash
npx tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch
```



</div>
