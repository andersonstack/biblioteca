export function authHeaders(contentType: "json" | "form" = "json"): HeadersInit {
  const token = sessionStorage.getItem("token");
  const headers: HeadersInit = {
    Authorization: `Bearer ${token ?? ""}`,
  };

  if (contentType === "json") {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
