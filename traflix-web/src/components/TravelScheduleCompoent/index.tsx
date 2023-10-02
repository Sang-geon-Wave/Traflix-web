import React, { useState, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import api from '../../api';

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

import { TrainCardDataType } from '../../types/TrainCardType';
import { TravelCardDataType } from '../../types/TravelCardType';
import { SummarySetDataType } from '../../types/SummarySetDataType';
import { SummaryDataType } from '../../types/SummaryDataType';

export interface PropsTravelScheduleComponent {
  travelSchedule: TravelCardDataType[];
  trainSchedule: TrainCardDataType[];
}

const TravelScheduleComponent: React.FunctionComponent<
  PropsTravelScheduleComponent
> = ({ travelSchedule, trainSchedule }) => {
  const { screenClass, isLogin } = useRootData(({ appStore, authStore }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: authStore.isLogin.get(),
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
  const [eventData, setEventData] = useState<
    (TravelCardDataType | TrainCardDataType)[][]
  >([]);
  const [summaryData, setSummaryData] = useState<SummarySetDataType[]>([]);

  async function getEmail() {
    try {
      const { data } = await api.get('/user/me');
      return data.email;
    } catch (err) {
      if (isLogin) {
        alert('잠시후 다시 시도해 주세요');
      }
    }
  }
  async function getTrainData(id: any) {
    const { data } = await api.post('/search/trainSchedule', {
      id: id,
    });
    return data;
  }
  async function getTravelData(id: any) {
    const { data } = await api.post('/search/contentInfo', {
      id: id,
    });
    return data;
  }
  async function setJourneyData(data: any) {
    let journeyList: (TravelCardDataType | TrainCardDataType)[][] = [];
    let summarySetList: SummarySetDataType[] = [];
    for (let i = 0; i < data.data.length; i++) {
      let summaryList: SummaryDataType[] = [];
      let eventList: (TravelCardDataType | TrainCardDataType)[] = [];

      let dep: string = '';
      let depTime: string = '';
      let arr: string = '';
      let arrTime: string = '';
      for (let j = 0; j < data.data[i].length; j++) {
        if (data.data[i][j].is_train === 1) {
          let departure = await getTrainData(data.data[i][j].train_schedule_id);
          let arrival = await getTrainData(
            data.data[i][j + 1].train_schedule_id,
          );
          let tmpData: TrainCardDataType = {
            isTrain: true,
            trainType: departure.data[0].train_type,
            trainNumber: departure.data[0].train_number,
            departureStation: departure.data[0].station_name,
            arrivalStation: arrival.data[0].station_name,
            departureTime: departure.data[0].stop_time,
            arrivalTime: arrival.data[0].stop_time,
          };
          eventList.push(tmpData);

          //summaryList
          if (dep === '') {
            dep = tmpData.departureStation;
            depTime = tmpData.departureTime;
            arr = tmpData.arrivalStation;
            arrTime = tmpData.arrivalTime;
          } else {
            arr = tmpData.arrivalStation;
          }
          j++;
        } else {
          let event = await getTravelData(data.data[i][j].content_id);
          let tmpData: TravelCardDataType = {
            isTrain: false,
            travelType: event.data.travelType,
            img: event.data.img,
            title: event.data.title,
            subtitle: event.data.subtitle,
            load: event.data.load,
            moreInfo: event.data.moreInfo,
          };
          eventList.push(tmpData);

          //summaryList
          if (summaryList.length === 0 && dep !== '') {
            summaryList.push({
              place: dep,
              time: depTime.substring(0, 5),
              tag: '출발',
            });
            dep = '';
          }
        }
      }
      //summaryList
      if (dep === '') {
        summaryList.push({
          place: arr,
          time: arrTime.substring(0, 5),
          tag: '도착',
        });
      } else {
        summaryList.push({
          place: dep,
          time: depTime.substring(0, 5),
          tag: '경유',
        });
        summaryList.push({
          place: arr,
          time: arrTime.substring(0, 5),
          tag: '도착',
        });
      }
      summarySetList.push({
        journeyDate: data.data[i][0].journey_date,
        summaryData: summaryList,
      });
      dep = arr = depTime = arrTime = '';
      journeyList.push(eventList);
    }
    setSummaryData(summarySetList);
    setEventData(journeyList);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const userEmail = await getEmail();
        const { data } = await api.post('/search/myJourney', {
          email: userEmail,
        });
        console.log(data);
        await setJourneyData(data);

        let init = [];
        for (let i = 0; i < data.length; i++) {
          init.push(false);
        }
        setDetailVisibility(init);
      } catch {
        alert('잠시후 다시 시도해 주세요');
      }
    }
    fetchData();
  }, []);

  const updateIndex = (idx: number) => {
    let update = [...detailVisibility];
    update[idx] = !update[idx];
    setDetailVisibility(update);
  };

  return (
    <div className={styles.main}>
      {summaryData.map((Data, i) => (
        <div className={styles.summaryBox} key={i}>
          <SummaryComponent
            date={new Date(Data.journeyDate)}
            summaryData={Data.summaryData}
          />
          {detailVisibility[i] ? (
            <img src={arrowUp} onClick={() => updateIndex(i)} />
          ) : (
            <img src={arrowDown} onClick={() => updateIndex(i)} />
          )}
          {detailVisibility[i] ? (
            <div className={styles.detailBox}>
              {eventData[i].map(
                (element: TravelCardDataType | TrainCardDataType, index) =>
                  element.isTrain ? (
                    <div>
                      <img className={styles.icon} src={train} />
                      <TrainCardComponent
                        isTrain={true}
                        trainType={(element as TrainCardDataType).trainType}
                        trainNumber={(element as TrainCardDataType).trainNumber}
                        departureStation={
                          (element as TrainCardDataType).departureStation
                        }
                        arrivalStation={
                          (element as TrainCardDataType).arrivalStation
                        }
                        departureTime={(
                          element as TrainCardDataType
                        ).departureTime.substring(0, 5)}
                        arrivalTime={(
                          element as TrainCardDataType
                        ).arrivalTime.substring(0, 5)}
                      />
                    </div>
                  ) : (
                    <div className={styles.main} key={index}>
                      {travelTypes.map(
                        (travelType: any, idx) =>
                          travelType[0] ===
                            (element as TravelCardDataType).travelType && (
                            <img
                              className={styles.icon}
                              src={travelType[1]}
                              key={`${travelType[0]}${idx}`}
                            />
                          ),
                      )}
                      <TravelCardComponent
                        isTrain={true}
                        title={(element as TravelCardDataType).title}
                        subtitle={(element as TravelCardDataType).subtitle}
                        img={(element as TravelCardDataType).img}
                        load={(element as TravelCardDataType).load}
                        moreInfo={(element as TravelCardDataType).moreInfo}
                        travelType={(element as TravelCardDataType).travelType}
                      />
                    </div>
                  ),
              )}
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
