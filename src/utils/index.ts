import { notification } from 'antd'
import { PaymentTypes } from 'interfaces'

export const isUserLoggedIn = () => localStorage.getItem('user')

export const openNotification = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  description: string
) => {
  notification[type]({
    message: message,
    description: description,
    duration: 10
  })
}

export const getPaymentType = (type: number) => {
  const pt = PaymentTypes.find((p) => p.value === type)
  return pt ? pt.label : ''
}
