import appStore from './app';
import loginModal from './loginModal';
import signupModal from './signupModal';
import authStore from './auth';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
  signupModal,
});

export default createRootStore;
