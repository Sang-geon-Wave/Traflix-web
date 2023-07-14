import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import Overlay from 'react-bootstrap/Overlay';
import LoginComponent from '../../components/LoginComponent';

const LoginPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [show, setShow] = useState(false);

  return (
    <Overlay target show={show}>
      <LoginComponent />
    </Overlay>
  );
};

export default LoginPage;
