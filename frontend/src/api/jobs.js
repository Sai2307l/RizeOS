import api from "../hooks/useApi";

export function fetchJobs(params) {
  return api.get("/api/jobs", { params });
}

export function fetchJob(id) {
  return api.get(`/api/jobs/${id}`);
}

export function createJob(data) {
  return api.post("/api/jobs", data);
}

export function updateJob(id, data) {
  return api.put(`/api/jobs/${id}`, data);
}
export function confirmPayment(id, data) {
  return api.post(`/api/jobs/${id}/confirm-payment`, data);
}
export function deleteJob(id) {
  return api.delete(`/api/jobs/${id}`);
}

export function applyToJob(id, data) {
  return api.post(`/api/jobs/${id}/apply`, data);
}

export function fetchAppliedJobs() {
  return api.get("/api/auth/applied");
}
