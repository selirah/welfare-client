import React, { createContext, useState } from 'react'
import { Auth, User } from 'interfaces'
import { path } from 'helpers/path'

interface IAuthContext {
  isSubmitting: boolean
  error: any
  user: User | null
  onSetUser: (user: User | null) => void
  onSetError: (error: any) => void
  onSetSubmitting: (isSubmitting: boolean) => void
  activeMenu: string
  onSetActiveMenu: (menu: string) => void
  onLogoutUser: () => void
}

const initState: IAuthContext = {
  isSubmitting: false,
  error: null,
  user: null,
  onSetError: (error) => console.log(error),
  onSetUser: (user) => console.log(user),
  onSetSubmitting: (isSubmitting) => console.log(isSubmitting),
  activeMenu: path.home,
  onSetActiveMenu: (menu) => console.log(menu),
  onLogoutUser: () => console.log('')
}

export const AuthContext = createContext<IAuthContext>(initState)

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(initState.user)
  const [error, setError] = useState<any>(initState.error)
  const [isSubmitting, setSubmitting] = useState(initState.isSubmitting)
  const [activeMenu, setActiveMenu] = useState(initState.activeMenu)

  const onSetUser = (user: User | null) => {
    setUser(user)
  }

  const onSetError = (error: any) => {
    setError(error)
  }

  const onSetSubmitting = (isSubmitting: boolean) => {
    setSubmitting(isSubmitting)
  }

  const onSetActiveMenu = (menu: string) => {
    setActiveMenu(menu)
  }

  const onLogoutUser = () => {
    setActiveMenu(path.home)
    setError(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        error,
        isSubmitting,
        onSetError,
        onSetSubmitting,
        onSetUser,
        user,
        activeMenu,
        onSetActiveMenu,
        onLogoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
