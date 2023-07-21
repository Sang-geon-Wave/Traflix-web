import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import SignupComponent from '../../components/SignupCompunent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const signupTestPage = () => {
  const { screenClass, signupShow, handleSignupShow, handleSignupClose } =
    useRootData(({ appStore, signupModal }) => ({
      screenClass: appStore.screenClass.get(),
      signupShow: signupModal.signupShow.get(),
      handleSignupShow: signupModal.handleSignupShow,
      handleSignupClose: signupModal.handleSignupClose,
    }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <>
      <Button variant="primary" onClick={handleSignupShow}>
        Launch demo modal
      </Button>

      <Modal show={signupShow} onHide={handleSignupClose} size="lg">
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
