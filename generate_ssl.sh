#!/bin/bash
mkdir -p frontend/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout frontend/nginx/ssl/server.key \
  -out frontend/nginx/ssl/server.crt \
  -subj '//C=IR\ST=Tehran\L=Tehran\O=OdooAli\CN=localhost'
echo "✅ Self-signed SSL created in ./ssl"
