const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

console.log('Current NODE_ENV=',process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production'){
  module.exports = prodConfig;
}else{
  console.log('running as develop mode, if you want code minified call --prod');
  module.exports = devConfig;
}