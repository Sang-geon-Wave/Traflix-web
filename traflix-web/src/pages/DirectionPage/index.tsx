import React, { Suspense, useEffect, useRef } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import MapComponent from '../../components/MapComponent';

import LoadingComponent from '../../components/LoadingComponent';
import TravelScheduleComponent from '../../components/TravelScheduleCompoent';
import HeaderComponent from '../../components/HeaderComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';

import { motion } from 'framer-motion';
import useBottomSheet from '../../hooks/useBottomSheet';
import styled from 'styled-components';
import { BOTTOM_SHEET_HEIGHT } from '../../hooks/BottomSheetOption';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 20;
  top: calc(100% - 90px);
  left: 0;
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 350ms ease-out;
`;

const DirectionPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const { sheet, content } = useBottomSheet();

  return isDesktop ? (
    <div className={styles.pageContainer}>
      <div className={styles.navbarContainer}>
        <HeaderComponent />
      </div>
      <div className={styles.cardItemsContainer}>
        <Suspense fallback={<LoadingComponent />}>
          <TravelScheduleComponent />
        </Suspense>
        <ContentDetailModalComponent />
      </div>
      <div className={styles.mapContainer}>
        <MapComponent></MapComponent>
      </div>
    </div>
  ) : (
    <div className={styles.pageContainer}>
      <div className={styles.navbarContainer}>
        <HeaderComponent />
      </div>
      <Wrapper ref={sheet}>
        <div className={styles.bottomSheetHeader}>
          <div className={styles.handle} />
        </div>
        <div className={styles.bottomSheetContent}>
          <div ref={content}>
            <Suspense fallback={<LoadingComponent />}>
              <TravelScheduleComponent />
            </Suspense>
            <ContentDetailModalComponent />
          </div>
        </div>
      </Wrapper>
      <div className={styles.mapContainer}>
        <MapComponent></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
