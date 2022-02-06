import http from '../http-common';

class MessagesDataService {

  getConfig(token) {
    return {
      headers: { Authorization: `Bearer ${token}` }
    }
  }

  getMessages(userId, prisonerId, token) {
    return http.get(`/message/${userId}/${prisonerId}`, this.getConfig(token));
  }
  getConversations(userId, token) {
    console.log(`Get Conversations token: ${token}`);
    return http.get(`/conversation/${userId}`, this.getConfig(token));
  }
  getUnread(token) {
    console.log(`Get unread token: ${token}`);
    return http.get('/message/unsent', this.getConfig(token));
  }
  createMessage(data, token) {
    return http.post('/message', data, this.getConfig(token));
  }
  createConversation(data, token) {
    console.log(token);
    return http.post('/conversation', data, this.getConfig(token));
  }

  getMessage(userId, prisonerId, messageId, token) {
    return http.get(`/message/${userId}/${prisonerId}/${messageId}`, this.getConfig(token))
  }
  updateMessage(data, token) {
    return http.put(`/message`, data, this.createConfig(token));
  }
  updateConversation(data, token) {
    return http.put(`/conversation`, data, this.createConfig(token));
  }
  deleteMessage(user_id, prisoner_id, message_id, token) {
    return http.delete(`/message/${user_id}/${prisoner_id}/${message_id}`, this.getConfig(token));
  }
  deleteConversation(user_id, prisoner_id, token) {
    return http.delete(`/conversation/${user_id}/${prisoner_id}`, this.getConfig(token));
  }
}

export default new MessagesDataService();
