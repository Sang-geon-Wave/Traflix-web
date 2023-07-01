import appStore from './app';

export interface TypeRootStore {
  appStore: typeof appStore;
}

const createRootStore = () => ({
  appStore,
});

export default createRootStore;
