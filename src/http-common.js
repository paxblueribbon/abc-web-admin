import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5001/ayebeesee-561c2/us-central1/app/api/',
  headers: {
    'Content-type': 'application/json'
  }
});

// export default axios.create({
//   baseURL: 'https://us-central1-ayebeesee-561c2.cloudfunctions.net/app/api/',
//   headers: {
//     'Content-type': 'application/json'
//   }
// });
