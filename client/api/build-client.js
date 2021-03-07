import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on server
    console.log("// We are on server");
    return axios.create({
      baseURL: 'http://auth-svc:3000/',
      headers: req.headers
    });
  } else {
    // We are on client
    console.log("// We are on client");
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;