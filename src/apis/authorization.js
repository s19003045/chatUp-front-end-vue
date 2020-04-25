import { apiHelper } from '../utils/helpers'

export default {
  signIn: ({ email, password }) => {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  /**
   * data:
   * {name, email, password, passwordCheck }
   * */
  signUp: (data) => {
    return apiHelper.post('/signup', {
      ...data
    })
  }
}