import axios from 'axios';
import { toast } from 'react-toastify';

// axios.interceptors.response.use(null, (error) => {
//   const exeptedErorr = error.request && error.request.status >= 400 && error.request.status < 500;

//   if (!exeptedErorr) {
//     console.log('exeptedErorr');
//   }

// toast.error('something went wrong');

//   return Promise.reject(error);
// });

const ApiUrl = 'http://localhost:3200/api';

// const ApiUrl = '/api';

export default async function req({ method, path, data }) {
  console.log(method, path, data);

  try {
    const { data: res } = await axios({
      method: method,
      url: ApiUrl + path,
      data: data,
    });

    console.log('res', res);
    return res;
  } catch (error) {
    console.log('error', error);
    toast.error('something went wrong!!!');
    throw error;
  }
}

export const getToken = (jwt) => (axios.defaults.headers.Authorization = jwt);
