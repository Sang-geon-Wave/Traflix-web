import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import logo from '../../assets/images/logo.svg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import BannerComponent from '../../components/BannerComponent';
import FooterComponent from '../../components/FooterComponent';
import SearchbarComponent from '../../components/searchbarComponent';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.app}>
      {/* <Container fluid> */}
      {/* HeaderComponent */}
      <Row>
        <BannerComponent />
      </Row>
      <Row>
        <div className={styles.hotSpotContainer}>
          <h3>가장 HOT 한 방문지</h3>
          {/* HotSpotCarouselComponent */}
        </div>
      </Row>
      <Row>
        <div className={styles.introContainer}>
          <h3>
            나와 내일로 여행,
            <br />
            최적의 경로로 이동해요
          </h3>
          {/* Introduction */}
        </div>
      </Row>
      <FooterComponent />
      {/* </Container> */}
    </div>
  );
};

export default LandingPage;
