import React from 'react';
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
import SummaryComponent from '../../components/SummaryComponent';
import SummaryTestData from '../../assets/string/summarycomponent/testData';
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
      <div className={`p-2 ${styles.cardItemsContainer}`}>
        <div>
          <SummaryComponent
            date={new Date('2023-09-14')}
            summaryData={SummaryTestData}
          />
        </div>
        <TravelScheduleComponent
          travelSchedule={testData}
          trainSchedule={TrainTestData}
        />
      </div>
      <div className={styles.mapContainer}>
        <MapComponent pathCoordinates={testPath}></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
