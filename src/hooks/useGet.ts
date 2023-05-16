import { useFetch } from "./useFetch";
function useGet<Type>(url: string, dependency?: boolean) {
  return useFetch<Type>(url, "GET", "", dependency);
}

export { useGet };
