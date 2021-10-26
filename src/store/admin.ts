import { action, observable, makeObservable } from 'mobx'
import { path } from 'helpers/path'

const link = localStorage.getItem('location')
export class AdminStore {
  topHeader = 'Home'
  location = link ? link : path.home

  constructor() {
    makeObservable(this, {
      topHeader: observable,
      onSetTopHeader: action,
      location: observable,
      onSetLocation: action
    })
  }

  onSetTopHeader(header: string) {
    this.topHeader = header
  }

  onSetLocation(location: string) {
    this.topHeader = location
    localStorage.setItem('location', location)
  }
}
