FROM httpd:alpine
MAINTAINER nino0813do

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
       bash \
       vim

RUN mv /usr/local/apache2/conf/httpd.conf /usr/local/apache2/conf/httpd.conf.orig
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
