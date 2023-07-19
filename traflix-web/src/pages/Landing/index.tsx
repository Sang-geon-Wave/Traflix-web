import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CardDataType } from '../../types/CardCarouselDataType';
import stationList from '../../assets/string/seachbarComponent/testData';

import BannerComponent from '../../components/BannerComponent';
import FooterComponent from '../../components/FooterComponent';
import SearchbarComponent from '../../components/searchbarComponent';
import HeaderComponent from '../../components/HeaderComponent';
import CardCarouselComponent from '../../components/CardCarouselComponent';

import svg_test1 from '../../assets/images/popular_spot_1.svg';
import svg_test2 from '../../assets/images/popular_spot_2.svg';
import png_test1 from '../../assets/images/castle.png';
import png_test2 from '../../assets/images/dongdaemun.png';
import introPhone from '../../assets/images/introPhone.png';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const cardData: CardDataType[] = [
    {
      imgUrl: png_test1,
      place: '1',
      addr: '1',
      info: '1',
    },
    {
      imgUrl: png_test2,
      place: '2',
      addr: '2',
      info: '2',
    },
    {
      imgUrl: svg_test1,
      place: '3',
      addr: '3',
      info: '3',
    },
    {
      imgUrl: svg_test2,
      place: '4',
      addr: '4',
      info: '4',
    },
  ];

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <Row>
        <BannerComponent />
        <div className={styles.searchBarArea}>
          <SearchbarComponent stationList={stationList} />
        </div>
      </Row>
      <Row>
        <div className={styles.hotSpotContainer}>
          <h3>가장 HOT 한 방문지</h3>
          <CardCarouselComponent cardData={cardData} />
        </div>
      </Row>
      <Row>
        <div className={styles.introContainer}>
          <h3>
            나와 내일로 여행,
            <br />
            최적의 경로로 이동해요
          </h3>
          <div className={styles.introImgBox}>
            <img src={introPhone} className={styles.introPhone1} />
            <img src={introPhone} className={styles.introPhone2} />
            <img src={introPhone} className={styles.introPhone3} />
          </div>
        </div>
      </Row>
      <FooterComponent />
    </div>
  );
};

export default LandingPage;
