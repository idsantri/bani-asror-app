import { Notify } from "quasar";

const notifySuccess = (message) => {
  Notify.create({
    type: "positive",
    message: message
  });
};
const notifyError = (message) => {
  Notify.create({
    type: "negative",
    message: message
  });
};
const notifyWarning = (message) => {
  Notify.create({
    type: "warning",
    message: message
  });
};

const notifyWarningExpired = () => {
  notifyWarning("Sesi telah berakhir.");
  notifyWarning("Anda perlu keluar lalu masuk lagi!");
};
export { notifySuccess, notifyError, notifyWarning, notifyWarningExpired };
