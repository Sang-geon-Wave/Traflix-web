import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import logoWhite from '../../assets/images/logo_traflix_tmp_white.svg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import MapComponent from '../../components/MapComponent';
import ScheduleComponent from '../../components/ScheduleComponent';
import config from '../../config';

import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import testPath1 from '../../assets/strings/MapComponent/mockData';
import scheduleTestData from '../../assets/string/scheduleComponent/testData';
import TravelScheduleComponent from '../../components/TravelScheduleCompoent';
import testData from '../../assets/string/travelCardComponent';

const DirectionPage = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const testPath: MapCoordinateDataType[] = testPath1;

  return (
    <div className={styles.app}>
      <Row className="gx-0">
        <Col className="bg-light" lg={3}>
          <Row className="gx-0 w-100">
            <Col className="bg-success py-2">
              <img src={logoWhite} className="p-2"></img>
            </Col>
          </Row>
          <Col className="px-2">
            <TravelScheduleComponent travelSchedule={testData} />
          </Col>
        </Col>
        <Col className={styles.mapContainer}>
          <MapComponent pathCoordinates={testPath}></MapComponent>
        </Col>
      </Row>
    </div>
  );
};

export default DirectionPage;
