import axios from 'axios';
const baseUrl = '/api/events';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  console.log('update', newObject);
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const findByName = (name) => {
  return axios.get(`${baseUrl}/${name}`).then((response) => response.data);
};

export default { getAll, create, update, findByName };
