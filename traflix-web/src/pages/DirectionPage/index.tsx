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
import HeaderComponent from '../../components/HeaderComponent';
import LoadingComponent from '../../components/LoadingComponent';
import SummaryComponent from '../../components/SummaryComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';
import test1 from '../../assets/strings/ContentDetailComponent/mockData';
import { ContentDetailDataType } from '../../types/ContentDetailDataType';
import { useState } from 'react';

const DirectionPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const testPath: MapCoordinateDataType[] = testPath1;

  const [isOpen, setIsOpen] = useState(true);
  const handleContentDetailModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />

      <div className={`bg-success py-2 ${styles.navbarContainer}`}>
        <img src={logoWhite} className="p-2"></img>
      </div>
      <div>
        <ContentDetailModalComponent
          isOpen={isOpen}
          contentDetailData={test1}
          handleContentDetailModal={handleContentDetailModal}
        ></ContentDetailModalComponent>
      </div>
      <div className={styles.cardItemsContainer}>
        <Suspense fallback={<LoadingComponent />}>
          <TravelScheduleComponent />
        </Suspense>
      </div>
      <div className={styles.mapContainer}>
        <MapComponent pathCoordinates={testPath}></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
