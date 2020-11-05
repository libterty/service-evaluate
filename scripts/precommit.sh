# $? 0: successfully end, 1: some issue
echo "\033[32m[pre-commit] Start prepush check\033[0m"

# Check for eslint
echo "\033[34m[pre-commit] Check for npm...\033[0m"
which npm &> /dev/null
if [[ "$?" == 1 ]]; then
    echo "\033[31m\xE2\x9C\x96 Please install npm\033[0m"
    exit 1
fi
echo "\033[32m\xE2\x9C\x94 Pass for checking npm \033[0m"

# Eslint check all files
echo "\033[34m[pre-commit] Eslint check all files \033[0m"
npm run lint
if [[ "$?" == 1 ]]; then
    echo "\033[31m\xE2\x9C\x96 ESlint check fail, abort git commit\033[0m"
    exit 1
fi
echo "\033[32m\xE2\x9C\x94 Pass for Eslint check \033[0m"

echo "\033[34m[pre-commit] Format check all files \033[0m"
npm run format
if [[ "$?" == 1 ]]; then
    echo "\033[31m\xE2\x9C\x96 Format check fail, abort git commit\033[0m"
    exit 1
fi

echo "\033[32m[pre-commit] successfully\033[0m"

echo "\033[32m[pre-commit] Please Check if you need to update commit for linting\033[0m"