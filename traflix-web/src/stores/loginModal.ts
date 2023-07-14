import { observable } from 'mobx';

const createStore = () => {
  const loginModal = {
    show: observable.box(false),

    handleShow() {
      loginModal.show.set(true);
    },
    handleClose() {
      loginModal.show.set(false);
    },
  };

  return loginModal;
};

const store = createStore();
export default store;
