#!/bin/bash
set -x
echo on;
HISTORY_VERSION=$(git describe --abbrev=0 --tags)
CODE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') 

echo "\033[34m[pre-publish] Check for Package Version...\033[0m"
if [[ "$HISTORY_VERSION" == "$CODE_VERSION" ]]; then
  echo "\033[31m\xE2\x9C\x96 Current Package version is already in history, abort upgrage package\033[0m"
  exit 1
fi 
echo "\033[32m\xE2\x9C\x94 Pass for Package Version Check \033[0m"