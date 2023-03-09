import { useQuasar } from "quasar";
const notifySuccess = (message) => {
  const $q = useQuasar();
  $q.notify({
    color: "green-6",
    textColor: "white",
    icon: "cloud_done",
    message: message
  });
};
export { notifySuccess };
