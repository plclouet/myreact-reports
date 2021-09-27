import http from "../http";

class ProtocolesService {
  getAll() {
    return http.get("/protocoles");
  }

  get(id) {
    return http.get(`/protocoles/${id}`);
  }

  getFilter(query) {
    return http.get("/protocoles" + query)
  }

  create(data) {
    return http.post("/protocoles", data);
  }

  update(id, data) {
    return http.put(`/protocoles/${id}`, data);
  }

  updateSearch(data) {
    return http.get("/protocoles", data);
  }

  delete(id) {
    return http.delete(`/protocoles/${id}`);
  }

  
}

export default new ProtocolesService();
