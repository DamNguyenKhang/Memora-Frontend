import axios from "axios";
import { API_BASE_URL } from "~/constants/APIs";

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});