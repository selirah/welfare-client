import { action, observable, makeObservable } from 'mobx'
import { path } from 'helpers/path'

const link = localStorage.getItem('location')
const title = localStorage.getItem('header')
const active = localStorage.getItem('active')
export class AdminStore {
  topHeader = title ? title : 'Home'
  location = link ? link : path.home
  active = active ? active : '1'

  constructor() {
    makeObservable(this, {
      topHeader: observable,
      onSetTopHeader: action,
      location: observable,
      active: observable,
      onSetLocation: action,
      onSetActive: action
    })
  }

  onSetTopHeader(header: string) {
    this.topHeader = header
    localStorage.setItem('header', header)
  }

  onSetLocation(location: string) {
    this.location = location
    localStorage.setItem('location', location)
  }

  onSetActive(active: string) {
    this.active = active
    localStorage.setItem('active', active)
  }
}
