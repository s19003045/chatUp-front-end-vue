import { apiHelper } from '../utils/helpers'
export default {
  indexPage: () => {
    return apiHelper.get('/')
  },
}