import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import LoginComponent from '../../components/LoginComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LoginModalPage = () => {
  const { screenClass, show, handleShow, handleClose } = useRootData(
    ({ appStore, loginModal }) => ({
      screenClass: appStore.screenClass.get(),
      show: loginModal.show.get(),
      handleShow: loginModal.handleShow,
      handleClose: loginModal.handleClose,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} className={styles.main}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginComponent />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModalPage;
