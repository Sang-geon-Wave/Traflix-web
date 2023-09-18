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
    handleSignupShow,
  } = useRootData(({ appStore, loginModal, authStore, signupModal }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: authStore.isLogin.get(),
    logout: authStore.logout,
    refresh: authStore.refresh,
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
          {isLogin ? '사람' : '임시'}
        </button>
        {isMenuOpen && (
          <div className={styles.menu}>
            {!isLogin && (
              <div onClick={handleSignupShow} className={styles.options}>
                회원가입
              </div>
            )}
            {!isLogin && (
              <div onClick={handleLoginShow} className={styles.options}>
                로그인
              </div>
            )}
            {isLogin && (
              <div onClick={logout} className={styles.options}>
                로그아웃
              </div>
            )}
            <div className={styles.options}>기타</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
