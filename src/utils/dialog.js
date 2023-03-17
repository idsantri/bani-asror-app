import { Dialog } from "quasar";
const messageBox = (title, message) => {
  Dialog.create({
    title: title,
    message: message,
    cancel: true
  });
};
export { messageBox };
