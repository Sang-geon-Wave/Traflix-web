import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import logoImg from '../../assets/images/logo_traflix_tmp_white.svg';
import listImg from '../../assets/images/list.svg';
import LoginModalPage from '../../pages/LoginModalPage';
import SignupModalPage from '../../pages/SignupPage';
// import stylesMobileDefault from './MobileDefault.module.scss';

const HeaderComponent = ({}) => {
  const {
    screenClass,
    isLogin,
    handleLoginShow,
    logout,
    refresh,
    userNickname,
    handleSignupShow,
  } = useRootData(({ appStore, loginModal, authStore, signupModal }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: authStore.isLogin.get(),
    logout: authStore.logout,
    refresh: authStore.refresh,
    userNickname: authStore.userNickname.get(),
    handleLoginShow: loginModal.handleLoginShow,
    handleSignupShow: signupModal.handleSignupShow,
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  useEffect(() => {
    refresh();
  }, []);

  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const tryLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      <LoginModalPage />
      <SignupModalPage />
      <div className={styles.contents}>
        <img
          className={styles.logo}
          src={logoImg}
          onClick={() => navigate('/')}
        />
        <button className={styles.menuButton} onClick={toggleMenu}>
          <img src={listImg} />
          {isLogin ? userNickname : '메뉴'}
        </button>
        {isMenuOpen && (
          <div className={styles.menu}>
            {!isLogin && (
              <div
                onClick={() => {
                  handleSignupShow();
                  setMenuOpen(false);
                }}
                className={styles.options}
              >
                회원가입
              </div>
            )}
            {!isLogin && (
              <div
                onClick={() => {
                  handleLoginShow();
                  setMenuOpen(false);
                }}
                className={styles.options}
              >
                로그인
              </div>
            )}
            {isLogin && (
              <div
                onClick={() => {
                  tryLogout();
                }}
                className={styles.options}
              >
                로그아웃
              </div>
            )}
            {isLogin && (
              <div
                className={styles.options}
                onClick={() => {
                  navigate('/Mypage');
                  setMenuOpen(false);
                }}
              >
                마이페이지
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
