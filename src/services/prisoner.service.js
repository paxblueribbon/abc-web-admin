import http from '../http-common';

class PrisonerDataService {
  getConfig(token) {
    return {
      headers: { Authorization: `Bearer ${token}` }
  }
  }

  getAll(token) {
    return http.get('/prisoner', this.getConfig(token));
  }
  get(id, token) {
    return http.get(`/prisoner/${id}`, this.getConfig(token));
  }
  create(data, token) {
    return http.post('/prisoner', data, this.getConfig(token) );
  }
  update(id, data, token) {
    return http.put(`/prisoner/${id}`, null, this.getConfig(token), data);
  }
  delete(prisoner_id, token) {
    return http.delete(`/prisoner/${prisoner_id}`, this.getConfig(token));
  }
  deleteAll(token) {
    return http.delete('/prisoner/all', this.getConfig(token));
  }
  findByName(name, token) {
    return http.get(`/prisoner?title=${name}`, this.getConfig(token));
  }
}

export default new PrisonerDataService();
