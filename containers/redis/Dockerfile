FROM redis
COPY ./redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "--include /usr/local/etc/redis/redis.conf"]
# CMD ["redis-server"]
EXPOSE 6379