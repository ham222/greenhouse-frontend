import { toast } from "react-toastify";

export function displayErrorToast(message: string) {
  toast(message, {
    toastId: message,
    role: "error-alert",
    className: "custom-toast !text-red-500 !font-semibold !font-sora",
  });
}

export function displayWarningToast(message: string) {
  toast(message, {
    toastId: message,
    role: "warning-alert",
    className: "custom-toast !text-orange-500 !font-semibold !font-sora",
  });
}

export function displaySuccessToast(message: string) {
  toast(message, {
    toastId: message,
    role: "success-alert",
    className: "custom-toast !text-green-500 !font-semibold !font-sora",
  });
}
