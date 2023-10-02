import { observable } from 'mobx';
import { ContentDetailDataType } from '../types/ContentDetailDataType';

const content: ContentDetailDataType = {
  title: '',
  img: '',
  contentType: '',
  tel: '',
  telname: '',
  addr: '',
  overview: '',
  zipcode: '',
  homepage: '',
  intro: {},
};

const createStore = () => {
  const contentModal = {
    contentShow: observable.box(false),
    content: observable.box(content),

    handleContentShow(contents: ContentDetailDataType) {
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
