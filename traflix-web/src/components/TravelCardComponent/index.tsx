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
  moreInfo, // 여기에 content_id 집어넣어야 할 듯 이건 누구 파트인지 알아보자
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const setDetailModal = async () => {
    const { data } = await api.post('/search/contentDetail', {
      content_id: moreInfo,
    });

    // data.detail이 아래와 같은 set(추후 변경 가능성 높음)
    // {
    //  "title":"가야밀면돼지국밥 일산본점",
    //  "img":"http://tong.visitkorea.or.kr/cms/resource/13/2891913_image2_1.jpg",
    //  "addr":"경기도 고양시 일산서구 호수로856번길 8-9",
    //  "overview":"어쩌구"
    // }
    // 그럼 이제 너가 모달 안에 들어가는 변수들을 저거에 맞게 변경하면 끝입니다.

    console.log(data.detail); // 이 함수 대신 modal을 여는 함수 실행하면 될 듯
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
          <Card.Link href={load} className={styles.links} target="_blank">
            길찾기
          </Card.Link>
          <Card.Text className={styles.links} onClick={setDetailModal}>
            자세히보기
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TravelCardComponent;
