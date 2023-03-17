import { Notify } from "quasar";

const notifySuccess = (message) => {
  Notify.create({
    color: "green-6",
    textColor: "green-1",
    icon: "cloud_done",
    message: message
  });
};
const notifyError = (message) => {
  Notify.create({
    type: "negative",
    message: message
  });
};
export { notifySuccess, notifyError };
