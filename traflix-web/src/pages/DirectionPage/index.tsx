import React, { Suspense } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import logoWhite from '../../assets/images/logo_traflix_tmp_white.svg';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import MapComponent from '../../components/MapComponent';
import config from '../../config';

import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import testPath1 from '../../assets/strings/MapComponent/mockData';
import TravelScheduleComponent from '../../components/TravelScheduleCompoent';
import testData from '../../assets/string/travelCardComponent';
import TrainTestData from '../../assets/string/trainCardComponent';
import HeaderComponent from '../../components/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent';
import SummaryComponent from '../../components/SummaryComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';
import test1 from '../../assets/strings/ContentDetailComponent/mockData';
import { ContentDetailDataType } from '../../types/ContentDetailDataType';
import { useState } from 'react';

const DirectionPage = () => {
  const { screenClass, content } = useRootData(
    ({ appStore, contentModal }) => ({
      screenClass: appStore.screenClass.get(),
      content: contentModal.content.get(),
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const testPath: MapCoordinateDataType[] = testPath1;

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />

      <div className={`bg-success py-2 ${styles.navbarContainer}`}>
        <img src={logoWhite} className="p-2"></img>
      </div>
      <div>
        <ContentDetailModalComponent />
      </div>
      <div className={styles.cardItemsContainer}>
        <Suspense fallback={<LoadingComponent />}>
          <TravelScheduleComponent
            travelSchedule={testData}
            trainSchedule={TrainTestData}
          />
        </Suspense>
      </div>
      <div className={styles.mapContainer}>
        <MapComponent pathCoordinates={testPath}></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
