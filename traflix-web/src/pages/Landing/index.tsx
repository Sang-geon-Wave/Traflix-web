import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import cardData from '../../assets/string/cardCarouselComponent/cardData';

import BannerComponent from '../../components/BannerComponent';
import FooterComponent from '../../components/FooterComponent';
import SearchbarComponent from '../../components/SearchbarComponent';
import HeaderComponent from '../../components/HeaderComponent';
import CardCarouselComponent from '../../components/CardCarouselComponent';

import introPhone from '../../assets/images/introPhone.png';
import bannerstring from '../../assets/images/bannerstring.png';

const LandingPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.container}>
      <HeaderComponent />
      <Row>
        <BannerComponent />
        <div className={styles.searchBarArea}>
          <img src={bannerstring} />
          <SearchbarComponent />
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
