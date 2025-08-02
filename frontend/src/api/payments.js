import api from "../hooks/useApi";

export function verifyPayment(data) {
  return api.post("/api/payments/verify", data);
}
