import { observable } from 'mobx';

const createStore = () => {
  const contentModal = {
    contentShow: observable.box(false),
    content: observable.box({}),

    handleContentShow(contents: object) {
      contentModal.content.set(contents);
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
