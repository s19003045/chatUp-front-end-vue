import { apiHelper } from '../utils/helpers'

export default {
  /**
  * Connect to API for authentication
  * When to use: login 
  *
  * @param {String} email Email for login 
  * @param {String} password Password for login
  * @return {Promise} Response from API
  */
  signIn: ({ email, password }) => {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },

  /**
  * Connect to API for sign up
  * When to use: sign up
  *
  * @param {Object} data User information for sign up
  * @return {Promise} Response from API
  */
  signUp: (data) => {
    return apiHelper.post('/signup', {
      ...data
    })
  }
}