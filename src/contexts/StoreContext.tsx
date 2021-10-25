import React, { createContext, PropsWithChildren } from 'react'
import { AuthStore, AdminStore } from 'store'

type StoreContextValue = {
  authStore: AuthStore
  adminStore: AdminStore
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue
)

const authStore = new AuthStore()
const adminStore = new AdminStore()

export const StoreContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <StoreContext.Provider value={{ authStore, adminStore }}>
      {children}
    </StoreContext.Provider>
  )
}
