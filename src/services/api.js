import axios from 'axios';

export const getImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api';
  const OPTIONS = `q=${query}&page=${page}&key=31323724-22dd8053e8d976f8867bdfa37&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${BASE_URL}/?${OPTIONS}`);
  return response.data;
};
