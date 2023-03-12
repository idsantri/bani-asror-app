import axios from "axios";
import { api } from "src/boot/axios";

const apiTokened = axios.create({ baseURL: api.defaults.baseURL });
apiTokened.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
export default apiTokened;
