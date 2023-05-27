import { toast } from "react-toastify";

const errorId = "network-error-id";

export function displayToast(message: string) {
  toast(message, { toastId: errorId, className: "custom-toast" });
}
