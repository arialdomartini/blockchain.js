docker run \
       --rm \
       -v $(pwd)/src:/app \
       node \
       bash -c "node /app/hello.js"
