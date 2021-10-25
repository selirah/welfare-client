import { action, observable, flow, makeObservable } from 'mobx'
import {
  User,
  LoginFields,
  RegisterFields,
  VerificationFields,
  ResendReset
} from 'interfaces'
import { callApiPost } from 'api'

export class AuthStore {
  isSubmitting = false
  error: any = null
  user: User | null = null
  success: boolean = false

  constructor() {
    makeObservable(this, {
      isSubmitting: observable,
      error: observable,
      user: observable,
      login: flow,
      onLogoutUser: action,
      onSetError: action,
      onSetSubmitting: action,
      onSetUser: action,
      register: flow,
      success: observable,
      onSetSuccess: action,
      verify: flow,
      resendCode: flow,
      resetPassword: flow
    })
  }

  onSetUser(user: User | null) {
    this.user = user
  }

  onSetSubmitting(isSubmitting: boolean) {
    this.isSubmitting = isSubmitting
  }

  onSetError(error: any) {
    this.error = error
  }

  onSetSuccess(success: boolean) {
    this.success = success
  }

  *login(payload: LoginFields): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('users/login', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetUser(response.data)
        this.onSetSuccess(true)
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', JSON.stringify(response.data.token))
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *register(payload: RegisterFields): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('users/sign-up', payload)
      if (response.status === 201) {
        this.onSetSubmitting(false)
        this.onSetUser(response.data)
        this.onSetSuccess(true)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *verify(payload: VerificationFields): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('users/account-verification', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
        this.onSetUser(null)
        localStorage.removeItem('user')
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *resendCode(payload: ResendReset): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('users/resend-code', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
        this.onSetUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *resetPassword(payload: ResendReset): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('users/reset-password', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
        this.onSetUser(null)
        localStorage.removeItem('user')
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  onLogoutUser() {
    this.onSetError(null)
    this.onSetUser(null)
    localStorage.clear()
  }
}
