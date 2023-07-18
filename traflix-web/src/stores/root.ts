import appStore from './app';
import signupModal from './signupModal';

export interface TypeRootStore {
  appStore: typeof appStore;
  signupModal: typeof signupModal;
}

const createRootStore = () => ({
  appStore,
  signupModal,
});

export default createRootStore;
