import React, { Suspense } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import MapComponent from '../../components/MapComponent';

import LoadingComponent from '../../components/LoadingComponent';
import TravelScheduleComponent from '../../components/TravelScheduleCompoent';
import testData from '../../assets/string/travelCardComponent';
import TrainTestData from '../../assets/string/trainCardComponent';
import HeaderComponent from '../../components/HeaderComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';

import { toJS } from 'mobx';

const DirectionPage = () => {
  const { screenClass, content, places } = useRootData(
    ({ appStore, contentModal, map }) => ({
      screenClass: appStore.screenClass.get(),
      content: contentModal.content.get(),
      places: toJS(map.places),
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbarContainer}>
        <HeaderComponent />
      </div>
      <div className={styles.cardItemsContainer}>
        <Suspense fallback={<LoadingComponent />}>
          <TravelScheduleComponent
            travelSchedule={testData}
            trainSchedule={TrainTestData}
          />
        </Suspense>
        <ContentDetailModalComponent />
      </div>
      <div className={styles.mapContainer}>
        <MapComponent></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
