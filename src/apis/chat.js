import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  indexPage: () => {
    return apiHelper.get('/', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getNamespace: (namespaceId) => {
    return apiHelper.get(`/namespace/${namespaceId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}