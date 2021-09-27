import http from "../http";

class ModelsService {
  getAll() {
    return http.get("/models");
  }

  get(id) {
    return http.get(`/models/${id}`);
  }

  getFilter(query) {
    return http.get("/models" + query)
  }

  create(data) {
    return http.post("/models", data);
  }

  update(id, data) {
    return http.put(`/models/${id}`, data);
  }

  updateSearch(data) {
    return http.get("/models", data);
  }

  delete(id) {
    return http.delete(`/models/${id}`);
  }
}

export default new ModelsService();
