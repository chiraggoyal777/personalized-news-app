import { useLocation } from "react-router-dom";

export function useQueryParams() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return {
    q: params.get("q"),
    from: params.get("from"),
    to: params.get("to")
  };
}
