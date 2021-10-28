export interface Institution {
  id: number
  user_id: string
  name: string
  location: string
  email: string
  phone: string
  sender_id: string
  payment_type: number
  api_key: string
  logo: string
  created_at: string
  updated_at: string
}

export interface InstitutionField {
  id?: number
  user_id: string
  name: string
  location: string
  email: string
  phone: string
  sender_id: string
  payment_type: any
  api_key: string
}

export const PaymentTypes = [
  { label: 'Uniform Payment', value: 1 },
  { label: 'Fixed-Rate Payment', value: 2 },
  { label: 'Non-Uniform Payment', value: 3 }
]
