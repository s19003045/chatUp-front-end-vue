import { apiHelper } from '../utils/helpers'

export default {
  /**
  * Connect to API for getting data in index page
  * When to use: link to index page 
  * @return {Promise} Response from API
  */
  indexPage: () => {
    return apiHelper.get('/')
  },

  /**
  * Connect to API for getting data in single namespace
  * When to use: link to single namespace
  * 
  * @param {String} namespaceId Id for namespace 
  * @return {Promise} Response from API
  */
  getNamespace: (namespaceId) => {
    return apiHelper.get(`/namespace/${namespaceId}`)
  },

  /**
  * Connect to API for getting data in chatroom
  * When to use: Into the chatroom
  * 
  * @param {String} chatroomuuid Id for chatroom
  * @return {Promise} Response from API
  */
  chatroom: (chatroomuuid) => {
    apiHelper.get(`/chatroom/${chatroomuuid}`)
  }
}