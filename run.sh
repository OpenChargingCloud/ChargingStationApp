#!/bin/bash

#tsc -p tsconfig.json
sass src/css/chargingStation.scss src/css/chargingStation.css
webpack -c webpack.config.cjs

npm start --silent -- --inspect "$@"
