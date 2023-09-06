# Upates

This tool checks for updates of modules compared to what is currently specified in your package.json.
```
npm install -g npm-check-updates

ncu -u
```

After updating your package.json, you can install the latest versions of your dependencies by deleting the node_modules folder and package-lock.json file and then running npm install.
```
rm -rf node_modules package-lock.json
npm install
```
