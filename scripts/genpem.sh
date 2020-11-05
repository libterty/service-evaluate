#!/bin/bash

echo "\033[32m[Generate-Certificate] Start Generate Certificate\033[0m"

echo "\033[34m[Generate-Certificate] Generate By Pass Key...\033[0m"
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
if [[ "$?" == 1 ]]; then
  echo "\033[31m\xE2\x9C\x96 Please install openssl \033[0m"
  exit 1
fi

echo "\033[34m[Generate-Certificate] Generate Server Key...\033[0m"
openssl rsa -passin pass:x -in server.pass.key -out server.key
if [[ "$?" != 1 ]]; then
  rm server.pass.key
fi

echo "\033[34m[Generate-Certificate] Generate Server Csr...\033[0m"
openssl openssl req -new -key server.key -out server.csr
echo "\033[34m[Generate-Certificate] Enter Info...\033[0m"

echo "\033[34m[Generate-Certificate] Generate Server Crt...\033[0m"
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
echo "\033[34m[Generate-Certificate] Generate Finish...\033[0m"

