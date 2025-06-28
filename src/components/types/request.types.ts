export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export interface SupportRequest {
  id: string
  subject: string
  description: string
  status: string
  requestType: string
  reference: string
  createdAt: string
  updatedAt: string
  customer?: User
  agent?: User
  attachments?: string[]
}

export interface Comment {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  user: User
  supportRequest?: {
    id: string
    subject: string
    reference: string
  }
}

// Legacy interface for backward compatibility
export interface LegacyComment {
  id: string
  fullName: string
  text: string
  createdAt: Date
}
