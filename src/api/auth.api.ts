import BaseAPI from './base.api'

class AuthApi extends BaseAPI {
  async signIn(email: string, password: string) {
    const response = await this.axiosInstance.post('', {
      query: `
            mutation SignIn {
                signIn(
                    input: { email: "${email}", password: "${password}" }
                ) {
                    token
                }
            }
          `,
    })

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message)
    }

    console.log('GraphQL Response:', response)
    return response.data?.data.signIn as { token: string }
  }

  async getAuthUser() {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          query GetAuthUser {
            getAuthUser {
              id
              email
              firstName
              lastName
              role
              createdAt
              updatedAt
            }
          }
        `,
      })

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }

      console.log('Get Auth User Response:', response)
      return response.data?.data.getAuthUser
    } catch (error) {
      console.error('Get Auth User Error:', error)
      throw error
    }
  }
}

export default new AuthApi()
