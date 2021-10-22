import { useContext } from 'react'
import { callApiPost } from 'api'
import { LoginFields } from 'interfaces'
import { AuthContext } from 'contexts'

const { onSetError, onSetSubmitting, onSetUser } = useContext(AuthContext)

export function login(payload: LoginFields) {
  try {
    onSetSubmitting(true)
    const res: any = callApiPost('users/login', payload)
    if (res.status === 200) {
      onSetUser(res.data)
      onSetSubmitting(false)
    }
  } catch (err: any) {
    onSetSubmitting(false)
    onSetError(err.response.data)
  }
}
