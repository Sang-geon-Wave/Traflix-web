import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import logo from '../../assets/images/logo.svg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.app}>
      <Container>
        <Row>
          <Col>
            <h1>랜딩페이지</h1>
          </Col>
          <Col>
            <Button variant="primary">테스트</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
