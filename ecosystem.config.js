const cpuCount = require('os').cpus().length;

module.exports = {
  apps : [{
    name: "gis-service",
    script: "./index.js",
    instances: cpuCount,
    instance_var: 0,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}