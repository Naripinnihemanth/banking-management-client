import axios from "axios";
import { TOKEN } from "./constents";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export default publicApi;
