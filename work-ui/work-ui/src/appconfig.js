const environment = process.env.NODE_ENV;

const devEndpoints = {
    workUrl: "http://344cc594f4e0.ngrok.io/api"
};

const endpointConfig = environment === "prod" ? prodEndpoints : devEndpoints;
const completeConfig = Object.assign({}, endpointConfig);

module.exports = completeConfig;