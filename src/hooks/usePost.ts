import { useFetch } from "./useFetch";
function usePost(url: string, body: any) {
  return useFetch(url, "POST", body);
}

export { usePost };
