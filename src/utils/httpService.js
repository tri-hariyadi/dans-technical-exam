import axios from 'axios';

const httpService = axios.create({
  baseURL: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
  timeout: 15000,
});

export default httpService;