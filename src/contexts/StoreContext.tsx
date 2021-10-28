import React, { createContext, PropsWithChildren } from 'react'
import { AuthStore, AdminStore, InstitutionStore } from 'store'

type StoreContextValue = {
  authStore: AuthStore
  adminStore: AdminStore
  institutionStore: InstitutionStore
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue
)

const authStore = new AuthStore()
const adminStore = new AdminStore()
const institutionStore = new InstitutionStore()

export const StoreContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <StoreContext.Provider value={{ authStore, adminStore, institutionStore }}>
      {children}
    </StoreContext.Provider>
  )
}
