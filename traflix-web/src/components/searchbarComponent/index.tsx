import React, { useState } from 'react';
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

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [searchStartVal, setSearchStartVal] = useState('');
  const [searchDestVal, setSearchDestVal] = useState('');

  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const today = year + '-' + month + '-' + day + `T00:00:00`;

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

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <Form
        onSubmit={(e) => searchPath(e)}
        className={styles.search}
        autoComplete="off"
      >
        <div className={styles.selectStations}>
          <div>
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
              />
            </FloatingLabel>
            <Dropdown className={styles.dropBox}>
              <Dropdown.Toggle
                variant="outline-success"
                className={styles.dropButton}
              />
              <Dropdown.Menu className={styles.dropList}>
                <Form.Control
                  type="text"
                  onKeyUp={(e) => inputStartSearch(e)}
                  placeholder="역 검색"
                  className={styles.searchBox}
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
            </Dropdown>
          </div>
          <div>
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
              />
            </FloatingLabel>
            <Dropdown className={styles.dropBox}>
              <Dropdown.Toggle
                variant="outline-success"
                className={styles.dropButton}
              />
              <Dropdown.Menu className={styles.dropList}>
                <Form.Control
                  type="text"
                  onKeyUp={(e) => inputDestSearch(e)}
                  placeholder="역 검색"
                  className={styles.searchBox}
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
            </Dropdown>
          </div>
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
