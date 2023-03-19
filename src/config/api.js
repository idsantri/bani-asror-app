import axios from "axios";
import { baseUrl } from "src/boot/axios";

const api = axios.create({ baseURL: baseUrl.defaults.baseURL });

const apiTokened = axios.create({ baseURL: baseUrl.defaults.baseURL });
const auth = JSON.parse(localStorage.getItem("auth"));
const token = auth ? auth.token : "FAIL TO GET TOKEN";
apiTokened.defaults.headers.common["Authorization"] = "Bearer " + token;

export { api, apiTokened };
