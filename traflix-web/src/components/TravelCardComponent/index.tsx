import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { TravelCardDataType } from '../../types/TravelCardDataType';
import { Card } from 'react-bootstrap';

const TravelCardComponent: React.FunctionComponent<TravelCardDataType> = ({
  img,
  title,
  subtitle,
  load,
  moreInfo,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <Card className={styles.main}>
      <Card.Img variant="top" src={img} className={styles.img} />
      <Card.Body className={styles.content}>
        <div>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Subtitle className={styles.subtitle}>{subtitle}</Card.Subtitle>
        </div>
        <div className={styles.linkBox}>
          <Card.Link href={load} className={styles.links} target="_blank">
            길찾기
          </Card.Link>
          <Card.Link href={moreInfo} className={styles.links} target="_blank">
            자세히보기
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TravelCardComponent;
