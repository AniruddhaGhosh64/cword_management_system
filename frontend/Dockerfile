FROM nginx:alpine

COPY dist /usr/share/nginx/html

EXPOSE 8080

CMD ["sh", "-c", "nginx -g 'daemon off;' -c /etc/nginx/nginx.conf"]