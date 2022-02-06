import http from '../http-common'

class RulesDataService {
  createConfig(token) {
    return {
      headers: { Authorization: `Bearer ${token}` }
    }
  }

  getAll(token) {
    console.log(token)
    return http.get('/rule', this.createConfig(token));
  }

  create(data, token) {
    console.log(token);
    return http.post('/rule', data, this.createConfig(token) );
  }
}

export default new RulesDataService();