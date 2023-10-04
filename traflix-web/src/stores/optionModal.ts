import { observable } from 'mobx';

const createStore = () => {
  const optionModal = {
    optionShow: observable.box(false),

    handleOptionShow() {
      optionModal.optionShow.set(true);
    },
    handleOptionClose() {
      optionModal.optionShow.set(false);
    },
  };

  return optionModal;
};

const store = createStore();
export default store;
