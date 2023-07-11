import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PopularSpotCardComponent from '../../components/PopularSpotCardComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import svg_test1 from '../../assets/images/popular_spot_1.svg';
import svg_test2 from '../../assets/images/popular_spot_2.svg';
import dong from '../../assets/images/dongdaemun.png';
import castle from '../../assets/images/castle.png';

const TestPopularSpotCardPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1100 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1099, min: 750 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 749, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      itemClass={styles.carousel_item}
      showDots={true}
    >
      <PopularSpotCardComponent imgUrl={dong} place="1" addr="1" info="1" />
      <PopularSpotCardComponent imgUrl={castle} place="2" addr="2" info="2" />
      <PopularSpotCardComponent
        imgUrl={svg_test1}
        place="3"
        addr="3"
        info="3"
      />
      <PopularSpotCardComponent
        imgUrl={svg_test2}
        place="4"
        addr="4"
        info="4"
      />
    </Carousel>
  );
};

export default TestPopularSpotCardPage;
