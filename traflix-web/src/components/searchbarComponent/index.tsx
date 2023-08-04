import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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

  const [start, setStart] = useState(stationList[0]);
  const [destination, setDestination] = useState(stationList[0]);
  const [startDate, setStartDate] = useState('');

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
    else
      alert(`start: ${start}, destination: ${destination} date: ${startDate}`);
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <Form onSubmit={(e) => searchPath(e)} className={styles.search}>
        <div className={styles.selectStations}>
          <FloatingLabel
            controlId="labelStart"
            label="출발역"
            className={styles.selectLabel}
          >
            <Form.Select
              aria-label="stationSelect"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className={styles.selectButton}
            >
              {stationList.map((station) => (
                <option key={`start_${station}`} value={station}>
                  {station}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="labelDestination"
            label="도착역"
            className={styles.selectLabel}
          >
            <Form.Select
              aria-label="destinationSelect"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.selectButton}
            >
              {stationList.map((station) => (
                <option key={`destination_${station}`} value={station}>
                  {station}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </div>
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
      </Form>
    </div>
  );
};

export default SearchbarComponent;
