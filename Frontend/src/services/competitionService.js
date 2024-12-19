import axios from 'axios';
const baseUrl = '/api/competitions';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  console.log('update', newObject);
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, getOne, create, update, remove };
