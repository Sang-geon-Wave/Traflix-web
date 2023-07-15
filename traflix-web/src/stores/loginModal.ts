import { observable } from 'mobx';

const createStore = () => {
  const loginModal = {
    loginShow: observable.box(false),

    handleLoginShow() {
      loginModal.loginShow.set(true);
    },
    handleLoginClose() {
      loginModal.loginShow.set(false);
    },
  };

  return loginModal;
};

const store = createStore();
export default store;
