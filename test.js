docker run \
       --rm \
       -v $(pwd)/src:/app \
       -w /app \
       node \
       node_modules/.bin/mocha --reporter list
