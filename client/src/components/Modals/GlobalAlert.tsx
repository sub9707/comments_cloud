import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeMessage, selectAlertMessages } from "../../store/Alert";

const convertToToastType = (type: string): TypeOptions => {
  switch (type) {
    case "info":
      return "info";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "default";
  }
};
export default function GlobalAlert() {
  const alertMessages = useSelector(selectAlertMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    alertMessages.forEach((message) => {
      toast(message.text, {
        type: convertToToastType(message.type),
        onClose: () => dispatch(removeMessage(message.id)),
      });
    });
  }, [alertMessages, dispatch]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
