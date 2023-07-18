import { observable } from 'mobx';
import api from '../api';

const createStore = () => {
  const kakaoStore = {
    kakaoAccessToken: observable.box<null | string>(null),
    kakaoIsLogin: observable.box(false),

    changekakaoAccessToken(data: null | string) {
      kakaoStore.kakaoAccessToken.set(data);
      kakaoStore.changeLoginState(data !== null);
    },
    changeLoginState(data: boolean) {
      kakaoStore.kakaoIsLogin.set(data);
    },

    async kakaoLogin(code: string) {
      try {
        const { data } = await api.post('/kakao/login', { code: code });
        const { access_token: kakaoAccessToken } = data;
        kakaoStore.changekakaoAccessToken(kakaoAccessToken);
        return true;
      } catch (err) {
        kakaoStore.changekakaoAccessToken(null);
        return false;
      }
    },
    async kakaoRefresh() {
      try {
        const { data } = await api.post('/kakao/refresh');
        const { access_token: kakaoAccessToken } = data;
        kakaoStore.changekakaoAccessToken(kakaoAccessToken);
        return kakaoAccessToken;
      } catch (err) {
        kakaoStore.changekakaoAccessToken(null);
        return null;
      }
    },
    async kakaoLogout() {
      try {
        const { data } = await api.post('/kakao/logout');
      } catch (err) {}
      kakaoStore.changekakaoAccessToken(null);
    },
  };

  return kakaoStore;
};

const store = createStore();
export default store;
