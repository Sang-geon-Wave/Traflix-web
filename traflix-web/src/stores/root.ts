import appStore from './app';
import loginModal from './loginModal';
import kakaoStore from './kakao';

export interface TypeRootStore {
  appStore: typeof appStore;
  loginModal: typeof loginModal;
  kakaoStore: typeof kakaoStore;
}

const createRootStore = () => ({
  appStore,
  loginModal,
  kakaoStore,
});

export default createRootStore;
