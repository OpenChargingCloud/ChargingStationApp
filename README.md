# OCC Charging Station

This project implements a set of **e-mobility charging stations** using [Electron](https://www.electronjs.org), a cross platform Open Source framework for creating native applications with web technologies like Java-/TypeScript, HTML, and (S)CSS. The focus of this project is **testing** and **certification** of the supported protocols and of 3rd party charging station operator backends. This project supports the following protocols and protocol extensions:

- [OCPP v1.6 JSON WebSockets](https://www.openchargealliance.org/protocols/ocpp-16/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org)
- **OCPP v1.6 JSON WebSockets with Computer Science Extentions** (OCPP v1.6 WS/CSE) as defined by the [Open Charging Cloud](https://github.com/OpenChargingCloud)
- [OCPP v2.0.1](https://www.openchargealliance.org/protocols/ocpp-201/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org) *(under development)*
- [OCPP v2.1 (Draft 0.4)](https://www.openchargealliance.org/protocols/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org) *(under development)*
- **OCPP v2.1 (Draft 0.4) with Computer Science Extentions** (OCPP v2.1/CSE) as defined by the [Open Charging Cloud](https://github.com/OpenChargingCloud) *(under development)*
- **WWCP Charging Station Protocol** (WWCP/CS) as defined by the [Open Charging Cloud](https://github.com/OpenChargingCloud) *(under development)*


## (Re-)Build

Install additional Node.js modules...

```
npm install electron@latest --save-dev
npm install electron-builder@latest --save-dev
npm install electron-localshortcut --save-dev
npm install typescript@latest --save-dev
npm install @types/node@latest --save-dev
npm install sass@latest --save-dev
npm install @types/elliptic@latest --save-dev
npm install @types/elliptic@latest --save-dev
npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install ts-loader --save-dev

```

Update of all Node.js modules...
```
$ npm update
```

Security updates...
```
$ npm audit fix
```

## License

[Apache License 2.0 License)](LICENSE)
