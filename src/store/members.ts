import { action, observable, flow, makeObservable } from 'mobx'
import { Member, MemberField } from 'interfaces'
import { callApiPost, callApiGet, callApiPut, callApiDelete } from 'api'

export class MemberStore {
  isSubmitting = false
  error: any = null
  members: Member[] = []
  success: boolean = false
  loading: boolean = false
  uploaded: boolean = false
  deleted: boolean = false

  constructor() {
    makeObservable(this, {
      error: observable,
      members: observable,
      isSubmitting: observable,
      loading: observable,
      success: observable,
      onSetError: action,
      onSetMembers: action,
      onSetSubmitting: action,
      onSetSuccess: action,
      onSetLoading: action,
      get: flow,
      create: flow,
      update: flow,
      upload: flow,
      uploaded: observable,
      onSetUploaded: action,
      delete: observable
    })
  }

  onSetMembers(members: Member[]) {
    this.members = members
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

  onSetDeleted(deleted: boolean) {
    this.deleted = deleted
  }

  *get(): any {
    try {
      this.onSetError(null)
      this.onSetLoading(true)
      const response = yield callApiGet('members')
      if (response.status === 200) {
        this.onSetLoading(false)
        this.onSetMembers(response.data)
      }
    } catch (err: any) {
      this.onSetLoading(false)
      this.onSetError(err.response.data)
    }
  }

  *create(payload: MemberField): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPost('members', payload)
      if (response.status === 201) {
        this.onSetSubmitting(false)
        this.onSetSuccess(true)
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *update(payload: MemberField): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiPut('members', payload, payload.id)
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
      const response = yield callApiPost('members/upload', payload)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetUploaded(true)
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }

  *delete(id: number): any {
    try {
      this.onSetError(null)
      this.onSetSubmitting(true)
      const response = yield callApiDelete('members', id)
      if (response.status === 200) {
        this.onSetSubmitting(false)
        this.onSetDeleted(true)
      }
    } catch (err: any) {
      this.onSetSubmitting(false)
      this.onSetError(err.response.data)
    }
  }
}
