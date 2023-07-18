import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import SignupComponent from '../../components/SignupCompunent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const signupTestPage = () => {
  const { screenClass, signupShow, handleLoginShow, handleLoginClose } =
    useRootData(({ appStore, signupModal }) => ({
      screenClass: appStore.screenClass.get(),
      signupShow: signupModal.signupShow.get(),
      handleLoginShow: signupModal.handleLoginShow,
      handleLoginClose: signupModal.handleLoginClose,
    }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <>
      <Button variant="primary" onClick={handleLoginShow}>
        Launch demo modal
      </Button>

      <Modal show={signupShow} onHide={handleLoginClose} size="lg">
        <Modal.Header closeButton />
        <div className={styles.modal}>
          <Modal.Body>
            <SignupComponent />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default signupTestPage;
