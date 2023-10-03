import appStore from './app';
import loginModal from './loginModal';
import signupModal from './signupModal';
import authStore from './auth';
import contentModal from './contentModal';
import optionModal from './optionModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
  contentModal: typeof contentModal;
  optionModal: typeof optionModal;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
  signupModal,
  contentModal,
  optionModal,
});

export default createRootStore;
