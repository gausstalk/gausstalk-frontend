FROM nginx

COPY build/ /usr/share/nginx/html/

# nginx의 default.conf를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
