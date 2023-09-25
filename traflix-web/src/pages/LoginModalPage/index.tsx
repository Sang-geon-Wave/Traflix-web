import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import LoginComponent from '../../components/LoginComponent';
import { Modal } from 'react-bootstrap';

const LoginModalPage = () => {
  const { screenClass, loginShow, handleLoginClose } = useRootData(
    ({ appStore, loginModal }) => ({
      screenClass: appStore.screenClass.get(),
      loginShow: loginModal.loginShow.get(),
      handleLoginClose: loginModal.handleLoginClose,
    }),
  );

  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Modal show={loginShow} onHide={handleLoginClose} size="lg">
      <Modal.Header closeButton />
      <div className={styles.modal}>
        <Modal.Body>
          <LoginComponent />
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default LoginModalPage;
