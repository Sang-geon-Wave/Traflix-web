import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { TravelCardDataType } from '../../types/TravelCardType';
import TravelCardComponent from '../TravelCardComponent';
import cafe from '../../assets/images/cafe.png';
import festival from '../../assets/images/festival.png';
import mountain from '../../assets/images/mountain.png';
import culture from '../../assets/images/culture.png';
import activite from '../../assets/images/activite.png';
import train from '../../assets/images/aeyung.jpg';
import TrainCardComponent from '../TrainCardComponent';
import { TrainCardDataType } from '../../types/TrainCardType';

export interface PropsTravelScheduleComponent {
  travelSchedule: TravelCardDataType[];
  trainSchedule: TrainCardDataType[];
}

const TravelScheduleComponent: React.FunctionComponent<
  PropsTravelScheduleComponent
> = ({ travelSchedule, trainSchedule }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const travelTypes = [
    ['cafe', cafe],
    ['festival', festival],
    ['culture', culture],
    ['activite', activite],
    ['mountain', mountain],
  ];

  return (
    <div>
      <img className={styles.icon} src={train} />
      <TrainCardComponent
        trainType={trainSchedule[0].trainType}
        trainNumber={trainSchedule[0].trainNumber}
        departureStation={trainSchedule[0].departureStation}
        arrivalStation={trainSchedule[0].arrivalStation}
        departureTime={trainSchedule[0].departureTime}
        arrivalTime={trainSchedule[0].arrivalTime}
      />
      <div>
        {travelSchedule.map((element: TravelCardDataType, index) => (
          <div className={styles.main} key={index}>
            {travelTypes.map(
              (travelType: any, idx) =>
                travelType[0] === element.travelType && (
                  <img
                    className={styles.icon}
                    src={travelType[1]}
                    key={`${travelType[0]}${idx}`}
                  />
                ),
            )}
            <TravelCardComponent
              title={element.title}
              subtitle={element.subtitle}
              img={element.img}
              load={element.load}
              moreInfo={element.moreInfo}
              travelType={element.travelType}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelScheduleComponent;
