import React, { createContext, PropsWithChildren } from 'react'
import { AuthStore, AdminStore, InstitutionStore, MemberStore } from 'store'

type StoreContextValue = {
  authStore: AuthStore
  adminStore: AdminStore
  institutionStore: InstitutionStore
  memberStore: MemberStore
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue
)

const authStore = new AuthStore()
const adminStore = new AdminStore()
const institutionStore = new InstitutionStore()
const memberStore = new MemberStore()

export const StoreContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <StoreContext.Provider
      value={{ authStore, adminStore, institutionStore, memberStore }}
    >
      {children}
    </StoreContext.Provider>
  )
}
