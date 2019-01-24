docker run \
       --rm \
       -v $(pwd)/src:/app \
       -w /app \
       -p 8080:8080 \
       blockchainjs \
       http-server
