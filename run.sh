docker run \
       --rm \
       -v $(pwd)/src:/app \
       -w /app \
       node \
       npm start --silent
