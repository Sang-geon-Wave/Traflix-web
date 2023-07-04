import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import stylesMobileDefault from './MobileDefault.module.scss';

const mockStation: string[] = [
  '길음역',
  '종각역',
  '불광역',
  '시청역',
  '동인천역',
  '용산역',
  '역1',
  '역2',
  '역3',
  '역4',
  '역5',
  '역6',
  '역7',
  '역8',
  '역9',
  '역10',
  '역11',
  '역12',
  '역13',
  '역14',
  '역15',
  '역16',
  '역17',
  '역18',
  '역19',
  '역20',
];

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

  if (stationList == null) stationList = mockStation;

  const [start, setStart] = useState(stationList[0]);
  const [destination, setDestination] = useState(stationList[0]);
  const [startDate, setStartDate] = useState('');

  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const today = year + '-' + month + '-' + day;

  const searchPath = () => {
    if (startDate === '') alert('날짜를 골라주세요');
    else if (start === destination)
      alert('출발지와 도착지를 다르게 설정해주세요');
    else
      alert(`start: ${start}, destination: ${destination} date: ${startDate}`);
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <Form onSubmit={searchPath} className={styles.search}>
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
              {mockStation.map((station) => (
                <option value={station}>{station}</option>
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
              {mockStation.map((station) => (
                <option value={station}>{station}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </div>
        <Form.Control
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.calender}
        />
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
