import { action, observable, makeObservable } from 'mobx'
import { path } from 'helpers/path'

export class AdminStore {
  activeMenu = path.home

  constructor() {
    makeObservable(this, { activeMenu: observable, onSetActiveMenu: action })
  }

  onSetActiveMenu(menu: string) {
    this.activeMenu = menu
  }
}
