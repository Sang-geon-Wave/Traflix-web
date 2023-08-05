import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

import trainImg from '../../assets/images/train.png';
import { TrainCardDataType } from '../../types/TrainCardType';
import TrainCardComponent from '../TrainCardComponent';

export interface PropsScheduleComponent {
  trainSchedule: TrainCardDataType[];
}
const ScheduleComponent: React.FunctionComponent<PropsScheduleComponent> = ({
  trainSchedule,
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
          trainType={trainSchedule[0].trainType}
          departure={trainSchedule[0].departure}
          arrival={trainSchedule[0].arrival}
          departureTime={trainSchedule[0].departureTime}
          arrivalTime={trainSchedule[0].arrivalTime}
        />
      </div>
    </div>
  );
};

export default ScheduleComponent;
