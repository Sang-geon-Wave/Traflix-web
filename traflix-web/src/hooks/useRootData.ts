import { useObserver } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { TypeRootStore } from '../stores/root';
import { storesContext } from '../utils/context';

export const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
): Selection => {
  const value = useContext(context);
  if (!value) {
    throw new Error('No store');
  }
  const store = storeSelector(value);

  return useObserver(() => {
    return dataSelector(store);
  });
};

export default <Selection>(
  dataSelector: (store: TypeRootStore) => Selection,
): Selection => {
  return useStoreData(
    storesContext,
    (contextData) => contextData as TypeRootStore,
    dataSelector,
  );
};
