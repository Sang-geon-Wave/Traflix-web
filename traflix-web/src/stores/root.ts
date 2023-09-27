import appStore from './app';
import loginModal from './loginModal';
import signupModal from './signupModal';
import authStore from './auth';
import contentModal from './contentModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
  contentModal: typeof contentModal;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
  signupModal,
  contentModal,
});

export default createRootStore;
