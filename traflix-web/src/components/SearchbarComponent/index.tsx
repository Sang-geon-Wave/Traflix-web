import React, { useState, useEffect, useRef, BaseSyntheticEvent } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Form, Button, FloatingLabel, Dropdown } from 'react-bootstrap';
import { dateFormat, dateTimeFormat } from '../../utils/dateFormat';
import api from '../../api';

const SearchbarComponent: React.FunctionComponent = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

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
      const { data } = await api.post('/search/stationName');

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
    if (stationList.indexOf(start) < 0) alert('출발역을 다시 확인해주세요');
    else if (stationList.indexOf(destination) < 0)
      alert('도착역을 다시 확인해주세요');
    else if (start === destination)
      alert('출발지와 도착지를 다르게 설정해주세요');
    else if (startDate === '') alert('날짜를 골라주세요');
    else
      alert(
        `start: ${stationMap.get(start) as string}, destination: ${
          stationMap.get(destination) as string
        } date: ${startDate}`,
      );
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

  return (
    <div className={styles.main}>
      <Form
        onSubmit={(e) => searchPath(e)}
        className={styles.search}
        autoComplete="off"
      >
        <div className={styles.selectStations}>
          <FloatingLabel
            controlId="labelStart"
            label="출발역"
            className={styles.selectLabel}
          >
            <Form.Control
              type="text"
              className={styles.selectText}
              value={start}
              readOnly={true}
              onClick={() => setShowStartSearch(true)}
              ref={startRef}
            />
          </FloatingLabel>
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
          <FloatingLabel
            controlId="labelDestination"
            label="도착역"
            className={styles.selectLabel}
          >
            <Form.Control
              type="text"
              className={styles.selectText}
              value={destination}
              readOnly={true}
              onClick={() => setShowDestSearch(true)}
              ref={destRef}
            />
          </FloatingLabel>
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
        <div className={styles.calBtn}>
          <FloatingLabel
            controlId="labelDate"
            label="출발일"
            className={styles.calenderLabel}
          >
            <Form.Control
              type="datetime-local"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.calender}
            />
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-success"
            className={styles.button}
          >
            검색
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchbarComponent;
