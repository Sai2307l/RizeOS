import api from "../hooks/useApi";

export function register(data) {
  return api.post("/api/auth/register", data);
}

export function login(data) {
  return api.post("/api/auth/login", data);
}

export function fetchProfile() {
  return api.get("/api/auth/profile");
}

export function updateProfile(data) {
  return api.put("/api/auth/profile", data);
}

