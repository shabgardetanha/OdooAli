# استفاده از بیز پایتون 3.11 (میتونید به نسخه دیگه تغییر بدهید)
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN useradd -m django_user
USER django_user

WORKDIR /app

USER root
RUN apt-get update && apt-get install -y --no-install-recommends gcc python3-dev default-libmysqlclient-dev nodejs npm curl 

COPY --chown=django_user:django_user requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=django_user:django_user . .

COPY . /app
RUN npm install && npm run build


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]