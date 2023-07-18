import { observable } from 'mobx';

const createStore = () => {
  const signupModal = {
    signupShow: observable.box(false),

    handleLoginShow() {
      signupModal.signupShow.set(true);
    },
    handleLoginClose() {
      signupModal.signupShow.set(false);
    },
  };

  return signupModal;
};

const store = createStore();
export default store;
