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

  // function myFunction() {
  //   document.getElementById('myDropdown').classList.toggle('show');
  // }

  // function filterFunction() {
  //   var input, filter, ul, li, a, i;
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   div = document.getElementById('myDropdown');
  //   a = div.getElementsByTagName('a');
  //   for (i = 0; i < a.length; i++) {
  //     txtValue = a[i].textContent || a[i].innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       a[i].style.display = '';
  //     } else {
  //       a[i].style.display = 'none';
  //     }
  //   }
  // }

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
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
              className={styles.selectButton}
              aria-label="stationSelect"
              value={start}
              readOnly={true}
              placeholder=" "
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="labelDestination"
            label="도착역"
            className={styles.selectLabel}
          >
            <Form.Control
              type="text"
              className={styles.selectButton}
              aria-label="stationSelect"
              value={destination}
              readOnly={true}
              placeholder=" "
            />
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
{
  /* <Dropdown>
            <Dropdown.Toggle variant="success" />
            <Dropdown.Menu>
              <Form.Control type="text" />
              {stationList.map((station) => (
                <Dropdown.Item
                  key={`destination_${station}`}
                  value={station}
                  onClick={() => setStart(station)}
                >
                  {station}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */
}
{
  /* <Dropdown>
            <Dropdown.Toggle variant="success" />
            <Dropdown.Menu>
              <Form.Control type="text" />
              {stationList.map((station) => (
                <Dropdown.Item
                  key={`destination_${station}`}
                  value={station}
                  onClick={() => setDestination(station)}
                >
                  {station}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */
}
{
  /* <Form.Control
              type="text"
              list="destinationList"
              aria-label="destinationSelect"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.selectButton}
              placeholder=""
            />
            <datalist id="destinationList">
              {stationList.map((station) => (
                <option
                  key={`destination_${station}`}
                  value={station}
                  className={styles.option}
                >
                  {station}
                </option>
              ))}
            </datalist> */
}
{
  /* <Form.Select
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
              </Form.Select> */
}

{
  /* <datalist id="startList" className={styles.selection}>
              {stationList.map((station) => (
                <option
                  key={`start_${station}`}
                  value={station}
                  className={styles.op}
                >
                  {station}
                </option>
              ))}
            </datalist> */
}
{
  /* <Form.Select
              aria-label="stationSelect"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className={styles.selectButton}
            >
              <Form.Control type="text"></Form.Control>
              {stationList.map((station) => (
                <option key={`start_${station}`} value={station}>
                  {station}
                </option>
              ))}
            </Form.Select> */
}
