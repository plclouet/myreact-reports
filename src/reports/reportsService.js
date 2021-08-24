import http from "../http";

class ReportsService {
  getAll() {
    return http.get("/reports");
  }

  get(id) {
    return http.get(`/reports/${id}`);
  }

  create(data) {
    return http.post("/reports", data);
  }

  update(id, data) {
    return http.put(`/reports/${id}`, data);
  }

  updateSearch(data) {
    return http.get("/reports", data);
  }

  delete(id) {
    return http.delete(`/reports/${id}`);
  }
}

export default new ReportsService();
