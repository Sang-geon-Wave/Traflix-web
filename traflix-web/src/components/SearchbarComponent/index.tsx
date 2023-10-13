import React, { useState, useEffect, useRef, BaseSyntheticEvent } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Form, Button, FloatingLabel, Dropdown } from 'react-bootstrap';
import { dateFormat, dateTimeFormat } from '../../utils/dateFormat';
import api from '../../api';
import SelectComponent from '../SelectComponent';
import { SelectCardDataType } from '../../types/SelectCardDataType';
import cafe from '../../assets/images/cafe.svg';
import stylesMobileDefault from './MobileDefault.module.scss';

const SearchbarComponent: React.FunctionComponent = ({}) => {
  const { screenClass, handleOptionShow } = useRootData(
    ({ appStore, optionModal }) => ({
      screenClass: appStore.screenClass.get(),
      handleOptionShow: optionModal.handleOptionShow,
    }),
  );

  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const today = dateFormat();
  const todayTime = dateTimeFormat();

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(todayTime);
  const [searchStartVal, setSearchStartVal] = useState('');
  const [searchDestVal, setSearchDestVal] = useState('');
  const [showStartSearch, setShowStartSearch] = useState(false);
  const [showDestSearch, setShowDestSearch] = useState(false);

  const [stationList, setStationList] = useState(['']);
  const [stationMap, _] = useState(new Map<string, string>());

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get('/search/stationName');

      let stations = [''];
      for (let i = 0; i < data.data.length; i++) {
        stationMap.set(
          data.data[i].station_name + '역',
          data.data[i].station_code,
        );
        stations.push(data.data[i].station_name + '역');
      }
      setStationList(stations);
    }
    fetchData();
  }, []);

  const searchPath = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (start === '' || destination === '')
      alert(`${start === '' ? '출발역' : '도착역'}을 선택해주세요`);
    else if (stationList.indexOf(start) < 0)
      alert('출발역을 다시 확인해주세요');
    else if (stationList.indexOf(destination) < 0)
      alert('도착역을 다시 확인해주세요');
    else if (start === destination)
      alert('출발지와 도착지를 다르게 설정해주세요');
    else if (startDate === '') alert('날짜를 골라주세요');
    else {
      handleOptionShow();
      return;
    }
  };

  const searchStartStation = (val: string) => {
    if (searchStartVal === '') return true;
    return val.includes(searchStartVal);
  };

  const inputStartSearch = (e: any) => {
    setSearchStartVal(e.target.value);
  };

  const searchDestStation = (val: string) => {
    if (searchDestVal === '') return true;
    return val.includes(searchDestVal);
  };

  const inputDestSearch = (e: any) => {
    setSearchDestVal(e.target.value);
  };

  const useOutsideClick = (callback: () => void, serachBoxId: string) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          event.target.id !== serachBoxId
        ) {
          callback();
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);

    return ref;
  };

  const startSearchBox = 'startSearchBox';
  const notStartClick = () => {
    setShowStartSearch(false);
  };

  const destSearchBox = 'destSearchBox';
  const notDestClick = () => {
    setShowDestSearch(false);
  };

  const startRef = useOutsideClick(notStartClick, startSearchBox);
  const destRef = useOutsideClick(notDestClick, destSearchBox);

  const modalData: SelectCardDataType[] = [
    { tag: '12', img: cafe },
    { tag: '14', img: cafe },
    { tag: '15', img: '' },
    { tag: '28', img: '' },
    { tag: '32', img: '' },
    { tag: '38', img: '' },
    { tag: '39', img: '' },
  ];

  return (
    <div className={styles.main}>
      <SelectComponent
        start={stationMap.get(start)}
        destination={stationMap.get(destination)}
        startDate={startDate}
        selectCardData={modalData}
      />
      <Form
        onSubmit={(e) => searchPath(e)}
        className={styles.search}
        autoComplete="off"
      >
        <div className={styles.selectStations}>
          <label htmlFor="startStation" className={styles.label}>
            출발역
            <Form.Control
              id="startStation"
              type="text"
              className={styles.selectText}
              value={start}
              readOnly={true}
              onClick={() => setShowStartSearch(true)}
              ref={startRef}
            />
          </label>
          <Dropdown className={styles.dropBox} show={true}>
            {showStartSearch && (
              <Dropdown.Menu className={styles.dropList}>
                <div className={styles.box}>
                  <Form.Control
                    type="text"
                    onChange={(e) => inputStartSearch(e)}
                    placeholder="역 검색"
                    className={styles.searchBox}
                    id={startSearchBox}
                  />
                </div>
                {stationList.map(
                  (station) =>
                    searchStartStation(station) && (
                      <Dropdown.Item
                        key={`start_${station}`}
                        value={station}
                        onClick={() => setStart(station)}
                        className={styles.dropItem}
                      >
                        {station}
                      </Dropdown.Item>
                    ),
                )}
              </Dropdown.Menu>
            )}
          </Dropdown>
          <label htmlFor="destStation" className={styles.label}>
            도착역
            <Form.Control
              id="destStation"
              type="text"
              className={styles.selectText}
              value={destination}
              readOnly={true}
              onClick={() => setShowDestSearch(true)}
              ref={destRef}
            />
          </label>
          <Dropdown className={styles.dropBox} show={true}>
            {showDestSearch && (
              <Dropdown.Menu className={styles.dropList}>
                <div className={styles.box}>
                  <Form.Control
                    type="text"
                    onChange={(e) => inputDestSearch(e)}
                    placeholder="역 검색"
                    className={styles.searchBox}
                    id={destSearchBox}
                  />
                </div>
                {stationList.map(
                  (station) =>
                    searchDestStation(station) && (
                      <Dropdown.Item
                        key={`destination_${station}`}
                        value={station}
                        onClick={() => setDestination(station)}
                        className={styles.dropItem}
                      >
                        {station}
                      </Dropdown.Item>
                    ),
                )}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
        <div>
          <label htmlFor="startDate" className={styles.calenderLabel}>
            출발일
            <Form.Control
              id="startDate"
              type="datetime-local"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.calender}
            />
          </label>
          <Button
            type="submit"
            variant="outline-success"
            className={styles.button}
          >
            취향 선택
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchbarComponent;
