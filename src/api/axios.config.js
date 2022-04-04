import axios from "axios";
import { api } from "utils";

const instance = axios.create({
  baseURL: api,
});

export default instance;