// default serve port
let LISTEN_PORT;
if (process.env.NODE_ENV === 'production') {
  LISTEN_PORT = 80;
} else {
  // While in developing, WebApp runs in port 3000 or 8080
  // API service will be run separately in port 4000
  LISTEN_PORT = 4000;
}

// default api server address
let API_SERVER = 'http://0.0.0.0:5000';


const Config = {
  LISTEN_PORT,
  API_SERVER
};

module.exports = Config;