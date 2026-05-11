FROM nginx:alpine


COPY front-end/. /usr/share/html/

EXPOSE 80