import BaseAPI from './base.api'

class CommentApi extends BaseAPI {
  async getComments(requestId: string, limit?: number, offset?: number) {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          query GetComments($requestId: ID!, $limit: Int, $offset: Int) {
            getComments(requestId: $requestId, limit: $limit, offset: $offset) {
              id
              text
              createdAt
              updatedAt
              user {
                id
                email
                firstName
                lastName
                role
              }
              supportRequest {
                id
                subject
                reference
              }
            }
          }
        `,
        variables: {
          requestId,
          limit: limit || 10,
          offset: offset || 0,
        },
      })

      console.log('Comments Response:', response)
      return response.data?.data?.getComments || []
    } catch (error) {
      console.error('Get Comments Error:', error)
      throw error
    }
  }

  async createComment(supportRequestId: string, text: string) {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          mutation CreateComment($input: CreateCommentInput!) {
            createComment(input: $input) {
              comment {
                id
                text
                createdAt
                updatedAt
                user {
                  id
                  email
                  firstName
                  lastName
                  role
                }
                supportRequest {
                  id
                  subject
                  reference
                }
              }
            }
          }
        `,
        variables: {
          input: {
            supportRequestId,
            text,
          },
        },
      })

      console.log('Create Comment Response:', response)

      if (response.data?.errors?.length > 0) {
        throw new Error(response.data.errors[0].message)
      }

      return response.data?.data?.createComment?.comment
    } catch (error) {
      console.error('Create Comment Error:', error)
      throw error
    }
  }
}

export default new CommentApi()
