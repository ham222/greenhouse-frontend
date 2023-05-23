import { toast } from "react-toastify";

const errorId = "network-error-id";

export function displayNetworkError(message: string) {
  toast(message, { toastId: errorId, className: "custom-toast" });
}
