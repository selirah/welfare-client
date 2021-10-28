import { action, observable, flow, makeObservable } from 'mobx'
import { Institution, InstitutionField, User } from 'interfaces'
import { callApiPost, callApiGet, callApiPut } from 'api'

export class InstitutionStore {
  isSubmitting = false
  error: any = null
  institution: Institution | null = null
  success: boolean = false
  loading: boolean = false
  uploaded: boolean = false

  constructor() {
    makeObservable(this, {
      error: observable,
      institution: observable,
      isSubmitting: observable,
      loading: observable,
      success: observable,
      onSetError: action,
      onSetInstitution: action,
      onSetSubmitting: action,
      onSetSuccess: action,
      onSetLoading: action,
      get: flow,
      create: flow,
      update: flow,
      upload: flow,
      uploaded: observable,
      onSetUploaded: action
    })
  }

  onSetInstitution(inst: Institution | null) {
    this.institution = inst
  }

  onSetSubmitting(isSubmitting: boolean) {
    this.isSubmitting = isSubmitting
  }

  onSetLoading(loading: boolean) {
    this.loading = loading
  }

  onSetError(error: any) {
    this.error = error
  }

  onSetSuccess(success: boolean) {
    this.success = success
  }

  onSetUploaded(uploaded: boolean) {
    this.uploaded = uploaded
  }

  *get(id: number): any {
    try {
      this.onSetError(null)
      this.onSetLoading(true)
      const response = yield callApiGet(`institution/${id}`)
      if (response.status === 200) {
        this.onSetLoading(false)
        this.onSetInstitution(response.data)
      }
    } catch (err: any) {
      this.onSetLoading(false)
      this.onSetError(err.response.data)
    }
  }

  *create(payload: InstitutionField): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('institution', payload)
      if (response.status === 201) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
        const store = localStorage.getItem('user')
        if (store) {
          const user: User = JSON.parse(store)
          user.institution_id = parseInt(response.data)
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *update(payload: InstitutionField): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPut('institution', payload, payload.id)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *upload(payload: any): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('institution/logo', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetUploaded(true)
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }
}
