import { notification } from 'antd'

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
