import React, { Suspense, useState, useEffect, useRef } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import MapComponent from '../../components/MapComponent';
import api from '../../api';

import culture from '../../assets/images/contentIcon/culture.svg';
import castle from '../../assets/images/contentIcon/castle.svg';
import sport from '../../assets/images/contentIcon/sport.svg';
import festival from '../../assets/images/contentIcon/festival.svg';
import lodgment from '../../assets/images/contentIcon/lodgment.svg';
import shopping from '../../assets/images/contentIcon/shopping.svg';
import restaurant from '../../assets/images/contentIcon/restaurant.svg';
import train from '../../assets/images/train.svg';

import arrowDown from '../../assets/images/caret-down-fill.svg';
import arrowUp from '../../assets/images/caret-up-fill.svg';

import SummaryComponent from '../../components/SummaryComponent';
import TrainCardComponent from '../../components/TrainCardComponent';
import TravelCardComponent from '../../components/TravelCardComponent';
import LoadingComponent from '../../components/LoadingComponent';
import HeaderComponent from '../../components/HeaderComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';

import { TrainCardDataType } from '../../types/TrainCardType';
import { TravelCardDataType } from '../../types/TravelCardType';
import { SummarySetDataType } from '../../types/SummarySetDataType';
import { SummaryDataType } from '../../types/SummaryDataType';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBottomSheet from '../../hooks/useBottomSheet';

const SearchPage = () => {
  const { screenClass, isLogin, handleMappAdd } = useRootData(
    ({ appStore, authStore, map }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: authStore.isLogin.get(),
      handleMappAdd: map.handleMapAdd,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const [isLoading, setIsLoading] = useState(true);

  const travelTypes = [
    ['12', castle],
    ['14', culture],
    ['15', festival],
    ['28', sport],
    ['32', lodgment],
    ['38', shopping],
    ['39', restaurant],
  ];

  const [detailVisibility, setDetailVisibility] = useState<boolean[]>([]);
  const [eventData, setEventData] = useState<
    (TravelCardDataType | TrainCardDataType)[][]
  >([]);

  const [summaryData, setSummaryData] = useState<SummarySetDataType[]>([]);

  const setJourneyData = async (data: any) => {
    const journeyList: (TravelCardDataType | TrainCardDataType)[][] = [];
    const summarySetList: SummarySetDataType[] = [];

    for (let i = 0; i < data.data.length; i++) {
      const summaryList: SummaryDataType[] = [];
      const eventList: (TravelCardDataType | TrainCardDataType)[] = [];
      let latlngTrain: MapCoordinateDataType[] = [];
      let latlngContent: MapCoordinateDataType[] = [];
      let dep: string = '';
      let depTime: string = '';
      let arr: string = '';
      let arrTime: string = '';

      for (let j = 0; j < data.data[i].length; j++) {
        if (data.data[i][j].is_train === 1) {
          const departure = data.data[i][j];
          const arrival = data.data[i][j + 1];
          if (latlngTrain.length === 0) {
            latlngTrain.push({
              placeName: departure.station_name,
              lat: departure.station_latitude,
              lng: departure.station_longitude,
              isTrain: true,
            });
          }
          latlngTrain.push({
            placeName: arrival.station_name,
            lat: arrival.station_latitude,
            lng: arrival.station_longitude,
            isTrain: true,
          });

          const tmpData: TrainCardDataType = {
            isTrain: true,
            trainType: departure.train_type,
            trainNumber: departure.train_number,
            departureStation: departure.station_name,
            arrivalStation: arrival.station_name,
            departureTime: departure.stop_time,
            arrivalTime: arrival.stop_time,
          };
          eventList.push(tmpData);

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
          const tmpData: TravelCardDataType = {
            isTrain: false,
            travelType: data.data[i][j].content.contenttypeid,
            img: data.data[i][j].content.firstimage,
            title: data.data[i][j].content.title,
            subtitle: ' ',
            load: ' ',
            moreInfo: data.data[i][j].content.contentid,
          };

          latlngContent.push({
            placeName: data.data[i][j].content.title,
            lng: data.data[i][j].content.mapx as number,
            lat: data.data[i][j].content.mapy as number,
            isTrain: false,
            contentType: data.data[i][j].content.contenttypeid,
          });

          eventList.push(tmpData);

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
      let combinedArray: MapCoordinateDataType[] = [
        ...latlngTrain,
        ...latlngContent,
      ];

      handleMappAdd(combinedArray);

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
  };

  const updateIndex = (idx: number) => {
    const update = [...detailVisibility];
    update[idx] = !update[idx];
    setDetailVisibility(update);
  };

  const location = useLocation();
  if (location.state) {
    useEffect(() => {
      const searchPath = async (
        start: string,
        destination: string,
        startDate: string,
        option: string[],
      ) => {
        try {
          setIsLoading(true);
          // 아래 api만 수정하면 이것도 될거임
          const { data } = await api.post('/search/findPath', {
            station_code_dep: start,
            station_code_arr: destination,
            datetime_dep: startDate,
            taste: option,
          });
          await setJourneyData(data);
          const init = new Array(data.length).fill(false);
          setDetailVisibility(init);
          setIsLoading(false);
        } catch {
          alert('잠시후 다시 시도해 주세요');
        }
      };
      searchPath(
        location.state.start,
        location.state.destination,
        location.state.startDate,
        location.state.option,
      );
    }, [location]);
  }

  const { sheet, content } = useBottomSheet();

  const contents = () => {
    return (
      <div>
        <Suspense fallback={<LoadingComponent />}>
          {isLoading ? <LoadingComponent /> : <></>}
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
                      (
                        element: TravelCardDataType | TrainCardDataType,
                        index,
                      ) => (
                        <div key={index}>
                          {element.isTrain ? (
                            <div>
                              <img className={styles.icon} src={train} />
                              <TrainCardComponent
                                isTrain={true}
                                trainType={
                                  (element as TrainCardDataType).trainType
                                }
                                trainNumber={
                                  (element as TrainCardDataType).trainNumber
                                }
                                departureStation={
                                  (element as TrainCardDataType)
                                    .departureStation
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
                                    (element as TravelCardDataType)
                                      .travelType && (
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
                                subtitle={
                                  (element as TravelCardDataType).subtitle
                                }
                                img={(element as TravelCardDataType).img}
                                load={(element as TravelCardDataType).load}
                                moreInfo={
                                  (element as TravelCardDataType).moreInfo
                                }
                                travelType={
                                  (element as TravelCardDataType).travelType
                                }
                              />
                            </div>
                          )}
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
        </Suspense>
        <ContentDetailModalComponent />
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbarContainer}>
        <HeaderComponent />
      </div>
      {isDesktop ? (
        <div className={styles.cardItemsContainer}>
          {contents()}
          <div ref={sheet} />
          <div ref={content} />
        </div>
      ) : (
        <motion.div className={styles.bottomSheet} ref={sheet}>
          <div className={styles.bottomSheetHeader}>
            <div className={styles.handle} />
          </div>
          <div className={styles.bottomSheetContent}>
            <div ref={content}>{contents()}</div>
          </div>
        </motion.div>
      )}
      <div className={styles.mapContainer}>
        <MapComponent></MapComponent>
      </div>
    </div>
  );
};

export default SearchPage;
