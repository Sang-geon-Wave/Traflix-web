import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

import { TrainCardDataType } from '../../types/TrainCardType';

const TrainCardComponent: React.FunctionComponent<TrainCardDataType> = ({
  trainType,
  departure,
  arrival,
  departureTime,
  arrivalTime,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  var estimatedHour =
    (24 +
      Number(arrivalTime.substring(0, 2)) -
      Number(departureTime.substring(0, 2))) %
    24;
  var estimatedMinute =
    Number(arrivalTime.substring(3, 5)) - Number(departureTime.substring(3, 5));
  if (estimatedMinute < 0) {
    estimatedMinute += 60;
    estimatedHour--;
  }
  return (
    <div className={styles.main}>
      <div className={styles.schedule}>
        <span>{trainType}</span> &nbsp;{departure} &gt; {arrival}
        <div className={styles.timeSet}>
          <span>
            {departureTime} ~ {arrivalTime}
          </span>
          <h6>
            {estimatedHour}:{estimatedMinute}소요
          </h6>
        </div>
      </div>
    </div>
  );
};

export default TrainCardComponent;
