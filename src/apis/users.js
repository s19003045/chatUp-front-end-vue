import { apiHelper } from '../utils/helpers'

export default {
  /** 
   * Connect to API for getting user data
   *
   * When to use: Link to pages when user info is needed
   * @return {Promise} Response from API
   */
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  }
}