export interface User {
  id: number
  parent_id: number
  email: string
  phone: string
  name: string
  email_verified_at: string
  password: string
  role: string
  token: string
  institution_id: number
  is_verified: number
  is_revoke: number
  admin_id: number
  created_at: string
  updated_at: string
}

export interface LoginFields {
  email: string
  password: string
}

export interface RegisterFields {
  name: string
  email: string
  phone: string
  password: string
  confirm_password: string
  agree: boolean
}

export interface VerificationFields {
  email: string
  code: string
}

export interface ResendReset {
  email: string
}
