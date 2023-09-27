import { observable } from 'mobx';

const createStore = () => {
  const contentModal = {
    contentShow: observable.box(false),

    handleContentShow() {
      contentModal.contentShow.set(true);
    },
    handleContentClose() {
      contentModal.contentShow.set(false);
    },
  };

  return contentModal;
};

const store = createStore();
export default store;
