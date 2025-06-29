import BaseAPI from './base.api'
import axios from 'axios'

class SupportRequestApi extends BaseAPI {
  async getRequestTypes() {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          query GetRequestTypes {
              getRequestTypes
          }
        `,
      })

      console.log('Request Types Response:', response)
      return response.data?.data?.getRequestTypes || []
    } catch (error) {
      console.error('Request Types Error:', error)
      throw error
    }
  }

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

  async createSupportRequest(formData: {
    requestType: string
    subject: string
    description: string
    attachments?: string[]
  }) {
    try {
      const response = await this.axiosInstance.post('', {
        query: `
          mutation CreateSupportRequest($input: CreateSupportRequestInput!) {
            createSupportRequest(input: $input) {
              supportRequest {
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
              }
            }
          }
        `,
        variables: {
          input: {
            requestType: formData.requestType,
            subject: formData.subject,
            description: formData.description,
            attachments: formData.attachments || [],
          },
        },
      })

      console.log('Create Support Request Response:', response)
      return response.data?.data?.createSupportRequest?.supportRequest
    } catch (error) {
      console.error('Create Support Request Error:', error)
      throw error
    }
  }
  async uploadFiles(files: File[]) {
    const cloudName = 'bridgingspace'
    const uploadPreset = 'tix-support-app'

    const uploadedFiles = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
        uploadedFiles.push(response.data.secure_url)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }

    return uploadedFiles
  }
}

export default new SupportRequestApi()
