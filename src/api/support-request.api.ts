import BaseAPI from './base.api'

class SupportRequestApi extends BaseAPI {
  async getSupportRequests() {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          query GetAllSupportRequests {
            getAllSupportRequests {
              id
              subject
              description
              status
              requestType
              reference
              createdAt
              updatedAt
              customer {
                id
                email
                firstName
                lastName
                role
              }
              agent {
                id
                email
                firstName
                lastName
                role
              }
            }
          }
        `,
      })

      console.log('Support Requests Response:', response)
      return response.data?.data?.getAllSupportRequests || []
    } catch (error) {
      console.error('Support Requests Error:', error)
      throw error
    }
  }

  async getMySupportRequests() {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          query GetMySupportRequests {
            getMySupportRequests {
              id
              subject
              description
              status
              requestType
              reference
              createdAt
              updatedAt
            }
          }
        `,
      })

      console.log('My Support Requests Response:', response)
      return response.data?.data?.getMySupportRequests || []
    } catch (error) {
      console.error('My Support Requests Error:', error)
      throw error
    }
  }
}

export default new SupportRequestApi()
