const fs = require('fs');

function getSSLConfigurations(index = 0){
    var ssl_configurations= [{
        key: fs.readFileSync(`${__dirname}/cert/privkey.pem`),
        cert: fs.readFileSync(`${__dirname}/cert/cert.pem`),
        ca: fs.readFileSync(`${__dirname}/cert/chain.pem`),
    }];

    if(index<=ssl_configurations.length){
        return ssl_configurations[index];
    }
    else{
        return undefined;
    }
}

module.exports = {
    getSSLConfigurations 
}