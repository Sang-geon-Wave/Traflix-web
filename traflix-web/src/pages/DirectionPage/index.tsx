import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import logo from '../../assets/images/logo.svg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import MapComponent from '../../components/MapComponent';
import config from '../../config';

const DirectionPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  console.log(config.kakaoToken);

  return (
    <div className={styles.app}>
      <Row className="gx-0">
        <Col className="bg-light" lg={3}>
          <Row>
            <Col className="bg-success py-2">
              <h3 className="text-start text-white px-2">Traflix</h3>
            </Col>
          </Row>
        </Col>
        <Col className={styles.mapContainer}>
          <MapComponent message={'d'} highlight={false}></MapComponent>
        </Col>
      </Row>
    </div>
  );
};

export default DirectionPage;
