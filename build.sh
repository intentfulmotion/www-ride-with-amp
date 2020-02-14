gatsby build
status=$?
[ $status -neq 0 ] exit 1

cd functions
yarn install
status=$?
[ $status -neq 0 ] exit 1