import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PopularSpotCardComponent from '../../components/PopularSpotCardComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import CardCarouselComponent from '../../components/CardCarouselComponent';

const TestPopularSpotCardPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.test}>
      <CardCarouselComponent />
    </div>
  );
};

export default TestPopularSpotCardPage;
