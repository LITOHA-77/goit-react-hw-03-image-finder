import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '23134758-68ab0efee1477745fc8aff6a6';

axios.defaults.baseURL = BASE_URL;

function getPicturesPixabayApi(query, page) {
  let params = `?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${KEY_API}`;

  return axios.get(params);
}

export default getPicturesPixabayApi;
