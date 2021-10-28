export interface Member {
  id: number
  institution_id: number
  member_staff_id: string
  member_name: string
  member_phone: string
  member_email: string
  created_at: string
  updated_at: string
}

export interface MemberField {
  id?: number
  staff_id: string
  name: string
  phone: string
  email: string
  institution_id: string | number
  amount: string
  payment_type: number | string
}
