import { apiHelper } from '../utils/helpers'

export default {
  indexPage: () => {
    return apiHelper.get('/')
  },
  getNamespace: (namespaceId) => {
    return apiHelper.get(`/namespace/${namespaceId}`)
  },
  chatroom: (chatroomuuid) => {
    apiHelper.get(`/chatroom/${chatroomuuid}`)
  }
}