#!/bin/bash

PACKAGE_JSON="package.json"

if [ ! -f "$PACKAGE_JSON" ]; then
  echo "package.json not found!"
  exit 1
fi

DEPENDENCIES=$(cat package.json | grep -Po '"[^"]*":\s*"\^[^"]*"' | cut -d '"' -f 2)

for PACKAGE in $DEPENDENCIES; do
  echo "Now updating: '$PACKAGE'..."
  npm install "$PACKAGE"@latest
done
