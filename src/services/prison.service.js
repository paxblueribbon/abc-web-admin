import http from '../http-common';

class PrisonDataService {

  createConfig(token) {
    return {
      headers: { Authorization: `Bearer ${token}` }
    }
  }

  getAll(token) {
    return http.get('/prison', this.createConfig(token));
  }
  get(id, token) {
    return http.get(`/prison/${id}`, this.createConfig(token));
  }
  create(data, token) {
    return http.post('/prison', data, this.createConfig(token));
  }
  update(id, data, token) {
    return http.put(`/prison/${id}`, data, this.createConfig(token));
  }
  delete(id, token) {
    return http.delete(`/prison/${id}`, this.createConfig(token));
  }
  deleteAll(token) {
    return http.delete('/prisons/all', this.createConfig(token));
  }
  findByName(name, token) {
    return http.get(`/prisoner?name=${name}`, this.createConfig(token));
  }
}

export default new PrisonDataService();