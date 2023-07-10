import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PopularSpotCardComponent from '../../components/PopularSpotCardComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import svg_test1 from '../../assets/images/popular_spot_1.svg';
import svg_test2 from '../../assets/images/popular_spot_2.svg';

const TestPopularSpotCardPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        itemClass={styles.carousel_item}
        showDots={true}
      >
        <div>
          <PopularSpotCardComponent imgUrl={svg_test1} />
        </div>
        <div>
          <PopularSpotCardComponent imgUrl={svg_test2} />
        </div>
        <div>
          <PopularSpotCardComponent imgUrl={svg_test1} />
        </div>
        <div>
          <PopularSpotCardComponent imgUrl={svg_test2} />
        </div>
      </Carousel>
    </>
  );
};

export default TestPopularSpotCardPage;
