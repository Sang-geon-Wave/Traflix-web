import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import stylesMobileDefault from './MobileDefault.module.scss';

const mockStation: string[] = [
  '길음역',
  '종각역',
  '동인천역',
  '불광역',
  '시청역',
  '용산역',
];

const SearchbarComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  // className={styles.main}
  return (
    <div>
      <Form className={styles.search}>
        <div className={styles.select}>
          <FloatingLabel controlId="floatingSelectS" label="출발역">
            <Form.Select aria-label="stationSelect" placeholder="출발역">
              {mockStation.map((station) => (
                <option value={station}>{station}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </div>
        <div className={styles.select}>
          <FloatingLabel controlId="floatingSelectD" label="도착역">
            <Form.Select aria-label="destinationSelect">
              {mockStation.map((station) => (
                <option value={station}>{station}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </div>
        <Button variant="primary" type="submit" className={styles.button}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SearchbarComponent;
