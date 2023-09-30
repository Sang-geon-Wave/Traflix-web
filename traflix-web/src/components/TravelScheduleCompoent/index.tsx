import React, { useState, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

import cafe from '../../assets/images/cafe.svg';
import festival from '../../assets/images/festival.png';
import mountain from '../../assets/images/tree.svg';
import culture from '../../assets/images/culture.png';
import activite from '../../assets/images/scooter.svg';
import train from '../../assets/images/train.svg';

import arrowDown from '../../assets/images/caret-down-fill.svg';
import arrowUp from '../../assets/images/caret-up-fill.svg';

import SummaryComponent from '../SummaryComponent';
import TrainCardComponent from '../TrainCardComponent';
import TravelCardComponent from '../TravelCardComponent';

import SummaryTestData from '../../assets/string/summarycomponent/testData';
import { TrainCardDataType } from '../../types/TrainCardType';
import { TravelCardDataType } from '../../types/TravelCardType';

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
  const [detailVisibility, setDetailVisibility] = useState<boolean[]>([]);

  useEffect(() => {
    async function fetchData() {
      let init = [];
      for (let i = 0; i < SummaryTestData.length; i++) {
        init.push(false);
      }
      setDetailVisibility(init);
    }
    fetchData();
  }, []);
  const updateIndex = (idx: number) => {
    let update = [...detailVisibility];
    update[idx] = !update[idx];
    console.log(update[idx]);
    setDetailVisibility(update);
  };
  return (
    <div className={styles.main}>
      {SummaryTestData.map((Data, i) => (
        <div className={styles.summaryBox} key={i}>
          <SummaryComponent
            date={
              new Date(
                `${Data.date.substring(0, 4)}-
                ${Data.date.substring(4, 6)}-
                ${Data.date.substring(6, 8)}`,
              )
            }
            summaryData={Data.summaryData}
          />
          {detailVisibility[i] ? (
            <img src={arrowUp} onClick={() => updateIndex(i)} />
          ) : (
            <img src={arrowDown} onClick={() => updateIndex(i)} />
          )}
          {detailVisibility[i] ? (
            <div className={styles.detailBox}>
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
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelScheduleComponent;
