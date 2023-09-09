// webpack.config.js
module.exports = [
    {
      mode:    'development',
      entry:   './src/ts/chargingStationApp.ts',
      target:  'electron-renderer',
      devtool: "eval-source-map",
      resolve: {
        extensions: ["", ".ts", ".js"]
      },
      module: {
        rules: [{
          test: /\.ts$/,
          //include: /src/,
          use: [{ loader: 'ts-loader' }]
        }]
      },
      externals: {
      //  'asn1':         'asn1.js',
      //  'base32decode': 'base32-decode'
      },
      output: {
        path: __dirname + '/src/build',
        filename: 'chargingStationApp-bundle.js'
      }
    }
  ];
