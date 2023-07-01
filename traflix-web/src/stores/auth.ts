import { observable } from 'mobx';
import axios from 'axios';
import api from '../api';

const createStore = () => {
  const authStore = {
    accessToken: observable.box<null | string>(null),
    isLogin: observable.box(false),

    changeAccessToken(data: null | string) {
      authStore.accessToken.set(data);
      authStore.changeLoginState(data !== null);
    },
    changeLoginState(data: boolean) {
      authStore.isLogin.set(data);
    },

    async login(userId: string, userPw: string, autologin: boolean = false) {
      try {
        const { data } = await api.post('/auth/login', {
          user_id: userId,
          user_pw: userPw,
          autologin: autologin,
        });
        const { access_token: accessToken } = data;
        authStore.changeAccessToken(accessToken);
        return true;
      } catch (err) {
        authStore.changeAccessToken(null);
        return false;
      }
    },
    async refresh() {
      try {
        const { data } = await api.post('/auth/refresh');
        const { access_token: accessToken } = data;
        authStore.changeAccessToken(accessToken);
        return accessToken;
      } catch (err) {
        authStore.changeAccessToken(null);
        return null;
      }
    },
    async logout() {
      try {
        const { data } = await api.post('/auth/logout');
      } catch (err) {}
      authStore.changeAccessToken(null);
    },
    async signup(
      userId: string,
      userPw: string,
      nickname: string = '',
      email: string = '',
    ) {
      try {
        const { data } = await api.post('/auth/signup', {
          user_id: userId,
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
