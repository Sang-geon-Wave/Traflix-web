import { useLocalStore } from 'mobx-react-lite'
import React, { createContext, ReactNode } from 'react'

import createRootStore, { TypeRootStore } from '../stores/root'

interface PropsStoreProvider {
  children: ReactNode
}

export const storesContext = createContext<TypeRootStore | null>(null)

export const StoreProvider = ({ children }: PropsStoreProvider): JSX.Element => {
  const store = useLocalStore(createRootStore)

  return <storesContext.Provider value={store}>{children}</storesContext.Provider>
}
