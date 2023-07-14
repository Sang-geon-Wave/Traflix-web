import appStore from './app';
import loginModal from './loginModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
}

const createRootStore = () => ({
  appStore,
  loginModal,
});

export default createRootStore;
