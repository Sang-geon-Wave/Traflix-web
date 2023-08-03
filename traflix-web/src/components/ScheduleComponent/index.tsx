import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

import trainImg from '../../assets/images/train.png';
import { TrainCardDataType } from '../../types/TrainCardType';
import TrainCardComponent from '../TrainCardComponent';

export interface PropsScheduleComponent {
  scheduleTestData: TrainCardDataType[];
}
const ScheduleComponent: React.FunctionComponent<PropsScheduleComponent> = ({
  scheduleTestData,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.main}>
      <img src={trainImg} />
      <div className={styles.schedule}>
        <TrainCardComponent
          trainType={scheduleTestData[0].trainType}
          // trainId={scheduleTestData[0].trainId}
          departure={scheduleTestData[0].departure}
          arrival={scheduleTestData[0].arrival}
          departureTime={scheduleTestData[0].departureTime}
          arrivalTime={scheduleTestData[0].arrivalTime}
        />
      </div>
    </div>
  );
};

export default ScheduleComponent;
