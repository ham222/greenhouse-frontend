import { toast } from "react-toastify";

const errorId = "network-error-id";
const successId = "success-id";
const warningId = "warning-id";

export function displayErrorToast(message: string) {
  toast(message, {
    toastId: errorId,
    className: "custom-toast !text-red-500 !font-semibold !font-sora",
  });
}

export function displayWarningToast(message: string) {
  toast(message, {
    toastId: warningId,
    className: "custom-toast !text-orange-500 !font-semibold !font-sora",
  });
}

export function displaySuccessToast(message: string) {
  toast(message, {
    toastId: successId,
    className: "custom-toast !text-green-500 !font-semibold !font-sora",
  });
}
