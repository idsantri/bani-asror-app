import axios from "axios";
import { api } from "src/boot/axios";

const auth = JSON.parse(localStorage.getItem("auth"));
const token = auth ? auth.token : "FAIL TO GET TOKEN";

const apiTokened = axios.create({ baseURL: api.defaults.baseURL });
apiTokened.defaults.headers.common["Authorization"] = "Bearer " + token;
export default apiTokened;
