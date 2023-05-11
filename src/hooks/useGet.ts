import { useFetch } from "./useFetch";
function useGet<Type>(url: string) {
  return useFetch<Type>(url, "GET");
}

export { useGet };
