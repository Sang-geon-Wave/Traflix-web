import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { TravelCardDataType } from '../../types/TravelCardType';
import { Card } from 'react-bootstrap';
import api from '../../api';

const TravelCardComponent: React.FunctionComponent<TravelCardDataType> = ({
  img,
  title,
  subtitle,
  load,
  moreInfo,
  travelType,
}) => {
  const { screenClass, handleContentShow } = useRootData(
    ({ appStore, contentModal }) => ({
      screenClass: appStore.screenClass.get(),
      handleContentShow: contentModal.handleContentShow,
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const setDetailModal = async () => {
    const { data } = await api.post('/search/contentDetail', {
      content_id: moreInfo,
      content_type_id: travelType,
    });

    handleContentShow(data.detail);
  };

  return (
    <Card className={styles.main}>
      <Card.Img variant="top" src={img} className={styles.img} />
      <Card.Body className={styles.content}>
        <div>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Subtitle className={styles.subtitle}>{subtitle}</Card.Subtitle>
        </div>
        <div className={styles.linkBox}>
          <Card.Text className={styles.links} onClick={setDetailModal}>
            자세히보기
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TravelCardComponent;
