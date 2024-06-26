# OCC Charging Station App

This project implements an **OCPP Charging Station** using [Electron](https://www.electronjs.org), a cross platform Open Source framework for creating native applications with web technologies like Java-/TypeScript, HTML, and (S)CSS. The focus of this project is **testing** and **certification** of the supported e-mobility protocols, vendor extensions and 3rd party charging station management systems. This project supports the following protocols and protocol extensions:

- [OCPP v1.6 JSON WebSockets](https://www.openchargealliance.org/protocols/ocpp-16/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org)
- [OCPP v2.0.1](https://www.openchargealliance.org/protocols/ocpp-201/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org) *(under development)*
- [OCPP v2.1 (Draft 0.4)](https://www.openchargealliance.org/protocols/) as defined by the [Open Charge Alliance](https://www.openchargealliance.org) *(under development)*
- **OCPP v2.1 (Draft 0.4) with Computer Science Extentions** (OCPP v2.1/CSE) as defined by the [Open Charging Cloud](https://github.com/OpenChargingCloud) *(under development)*
- **WWCP Charging Station Protocol** (WWCP/CS) as defined by the [Open Charging Cloud](https://github.com/OpenChargingCloud) *(under development)*


## (Re-)Build

Install the required Node.js modules...
```
$ npm install
```

(Security) updates...
```
$ npm audit fix
$ npm update
```

Forced update of all Node.js modules...
```
$ ./update.sh
```

## License

[Apache License 2.0 License)](LICENSE)
