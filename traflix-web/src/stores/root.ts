import appStore from './app';
import loginModal from './loginModal';
import signupModal from './signupModal';
import authStore from './auth';
import contentModal from './contentModal';
import map from './map';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  authStore: typeof authStore;
  signupModal: typeof signupModal;
  contentModal: typeof contentModal;
  map: typeof map;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  authStore,
  signupModal,
  contentModal,
  map,
});

export default createRootStore;
