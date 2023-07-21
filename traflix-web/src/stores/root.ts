import appStore from './app';
import loginModal from './loginModal';
import authStore from './auth';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
});

export default createRootStore;
