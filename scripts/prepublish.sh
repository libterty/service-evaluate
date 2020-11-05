# $? 0: successfully end, 1: some issue
echo "\033[32m[pre-publish] Start prepublish check\033[0m"

# Check for unit test
echo "\033[34m[pre-publish] Check for unit test...\033[0m"
npm run test
if [[ "$?" == 1 ]]; then
    echo "\033[31m\xE2\x9C\x96 Please check which test fail, abort git push\033[0m"
    exit 1
fi
echo "\033[32m\xE2\x9C\x94 Pass for checking unit test \033[0m"

# Start to build files
echo "\033[34m[pre-publish] Start to build all files \033[0m"
npm run build:test
if [[ "$?" == 1 ]]; then
    echo "\033[31m\xE2\x9C\x96 Build fail, abort git push\033[0m"
    exit 1
fi
echo "\033[32m\xE2\x9C\x94 Build Pass \033[0m"

echo "\033[34m[pre-publish] Preparing for the Publish and Push process...\033[0m"
sleep 5s
echo "\033[34m[pre-publish] Starting for the Publish and Push process...\033[0m"

echo "\033[32m[pre-publish] successfully\033[0m"
echo "\x1b[33m\xE2\x9C\x94 If you have new Changes After this means you forget to build Package \x1b[33m"