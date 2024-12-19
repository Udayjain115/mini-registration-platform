import axios from 'axios';
const baseUrl = '/api/questions';

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
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, getOne, create, update, remove };
