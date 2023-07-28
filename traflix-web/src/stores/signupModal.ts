import { observable } from 'mobx';

const createStore = () => {
  const signupModal = {
    signupShow: observable.box(false),

    handleSignupShow() {
      signupModal.signupShow.set(true);
    },
    handleSignupClose() {
      signupModal.signupShow.set(false);
    },
  };

  return signupModal;
};

const store = createStore();
export default store;
