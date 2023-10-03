import appStore from './app';
import loginModal from './loginModal';
import signupModal from './signupModal';
import authStore from './auth';
import optionModal from './optionModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
  optionModal: typeof optionModal;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
  signupModal,
  optionModal,
});

export default createRootStore;
