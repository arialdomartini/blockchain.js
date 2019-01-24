docker run \
       --rm \
       -ti \
       -w /app \
       -v $(pwd)/src:/app \
       node \
       bash
