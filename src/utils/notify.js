import { Notify } from "quasar";

const notifySuccess = (message) => {
  Notify.create({
    color: "green-6",
    textColor: "white",
    icon: "cloud_done",
    message: message
  });
};
export { notifySuccess };
