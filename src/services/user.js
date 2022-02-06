import http from '../http-common';

class UserDataService {
  createConfig(token) {
    return {
      headers: { Authorization: `Bearer ${token}` }
    }
  }

  getAll(token) {
    return http.get('/user', this.createConfig(token));
  }
  get(id, token) {
    return http.get(`/user/${id}`, this.createConfig(token));
  }
  create(data, token) {
    return http.post('/user', data, this.createConfig(token));
  }
  update(id, data, token) {
    return http.put(`/user/update/${id}`, data, this.createConfig(token));
  }
  delete(id, token) {
    return http.delete(`/deleteUser/${id}`, this.createConfig(token));
  }
  deleteAll(token) {
    return http.delete('/deleteAllUsers', this.createConfig(token));
  }
  findByName(name, token) {
    return http.get(`/user?name=${name}`, this.createConfig(token));
  }
  promoteUser(uuid, token) {
    console.log(token);
    return http.put(`/user/${uuid}/promote`, {userID: uuid}, this.createConfig(token));
  }
}

export default new UserDataService();