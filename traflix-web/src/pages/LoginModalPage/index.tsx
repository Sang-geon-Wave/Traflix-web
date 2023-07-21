import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import LoginComponent from '../../components/LoginComponent';
import { Button, Modal } from 'react-bootstrap';

const LoginModalPage = () => {
  const {
    screenClass,
    loginShow,
    handleLoginShow,
    handleLoginClose,
    isLogin,
    logout,
  } = useRootData(({ appStore, loginModal, authStore }) => ({
    screenClass: appStore.screenClass.get(),
    loginShow: loginModal.loginShow.get(),
    handleLoginShow: loginModal.handleLoginShow,
    handleLoginClose: loginModal.handleLoginClose,
    isLogin: authStore.isLogin.get(),
    logout: authStore.logout,
  }));

  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <>
      {isLogin && <h1>asd</h1>}
      <Button onClick={handleLoginShow}>login</Button>
      <Button onClick={logout}>logout</Button>
      <Modal show={loginShow} onHide={handleLoginClose} size="lg">
        <Modal.Header closeButton />
        <div className={styles.modal}>
          <Modal.Body>
            <LoginComponent />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default LoginModalPage;
