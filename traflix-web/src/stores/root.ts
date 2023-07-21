import appStore from './app';
import authStore from './auth';
import signupModal from './signupModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
}

const createRootStore = () => ({
  appStore,
  authStore,
  signupModal,
});

export default createRootStore;
