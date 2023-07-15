import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import LoginComponent from '../../components/LoginComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LoginModalPage = () => {
  const { screenClass, loginShow, handleLoginShow, handleLoginClose } =
    useRootData(({ appStore, loginModal }) => ({
      screenClass: appStore.screenClass.get(),
      loginShow: loginModal.loginShow.get(),
      handleLoginShow: loginModal.handleLoginShow,
      handleLoginClose: loginModal.handleLoginClose,
    }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <>
      <Button variant="primary" onClick={handleLoginShow}>
        Launch demo modal
      </Button>

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
