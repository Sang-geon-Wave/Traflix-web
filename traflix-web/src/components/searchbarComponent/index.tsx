import React, { useState, useEffect, useRef } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Form, Button, FloatingLabel, Dropdown } from 'react-bootstrap';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsSearchbarComponent {
  stationList: string[];
}

const SearchbarComponent: React.FunctionComponent<PropsSearchbarComponent> = ({
  stationList,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const today = `${year}-${month}-${day}T00:00`;
  const todayTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(todayTime);
  const [searchStartVal, setSearchStartVal] = useState('');
  const [searchDestVal, setSearchDestVal] = useState('');
  const [showStartSearch, setShowStartSearch] = useState(false);
  const [showDestSearch, setShowDestSearch] = useState(false);

  const searchPath = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (startDate === '') alert('날짜를 골라주세요');
    else if (start === destination)
      alert('출발지와 도착지를 다르게 설정해주세요');
    else if (stationList.indexOf(start) < 0)
      alert('출발역을 다시 확인해주세요');
    else if (stationList.indexOf(destination) < 0)
      alert('도착역을 다시 확인해주세요');
    else
      alert(`start: ${start}, destination: ${destination} date: ${startDate}`);
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
      const handleClick = (event: any) => {
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
                <Form.Control
                  type="text"
                  onKeyUp={(e) => inputStartSearch(e)}
                  placeholder="역 검색"
                  className={styles.searchBox}
                  id={startSearchBox}
                />
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
                <Form.Control
                  type="text"
                  onKeyUp={(e) => inputDestSearch(e)}
                  placeholder="역 검색"
                  className={styles.searchBox}
                  id={destSearchBox}
                />
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
