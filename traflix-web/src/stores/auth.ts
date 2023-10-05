import { observable, runInAction } from 'mobx';
import axios from 'axios';
import api from '../api';

const createStore = () => {
  const authStore = {
    accessToken: observable.box<null | string>(null),
    userNickname: observable.box(''),
    isLogin: observable.box(false),

    changeAccessToken(data: null | string) {
      authStore.accessToken.set(data);
      authStore.changeLoginState(data !== null);
    },
    changeLoginState(data: boolean) {
      authStore.isLogin.set(data);
    },
    changeNickname(data: string) {
      authStore.userNickname.set(data);
    },

    async login(code: string | null, email: string = '', userPw: string = '') {
      try {
        const { data } = await api.post('/auth/login', {
          code: code,
          email: email,
          user_pw: userPw,
        });
        const { access_token: accessToken, nickname: nickname } = data;
        runInAction(() => {
          authStore.changeAccessToken(accessToken);
          authStore.changeNickname(nickname);
        });
        return true;
      } catch (err) {
        runInAction(() => {
          authStore.changeAccessToken(null);
        });
        return false;
      }
    },
    async refresh() {
      try {
        const { data } = await api.post('/auth/refresh');
        const { access_token: accessToken, nickname: nickname } = data;
        runInAction(() => {
          authStore.changeAccessToken(accessToken);
          authStore.changeNickname(nickname);
        });
        return accessToken;
      } catch (err) {
        runInAction(() => {
          authStore.changeAccessToken(null);
        });
        return null;
      }
    },
    async logout() {
      try {
        const { data } = await api.post('/auth/logout');
        authStore.changeLoginState(false);
      } catch (err) {}
      runInAction(() => {
        authStore.changeAccessToken(null);
      });
    },
    async signup(userPw: string, nickname: string = '', email: string = '') {
      try {
        const { data } = await api.post('/auth/signup', {
          user_pw: userPw,
          nickname: nickname,
          email: email,
        });
        return data.status;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return err.response?.data.status;
        }
        return false;
      }
    },
  };

  return authStore;
};

const store = createStore();
export default store;
