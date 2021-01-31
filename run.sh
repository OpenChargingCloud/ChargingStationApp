#!/bin/bash

tsc -p tsconfig.json
sass src/css/chargingStation.scss src/css/chargingStation.css

npm start --silent -- --debug "$@"
