import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import CardCarouselComponent from '../../components/CardCarouselComponent';

import svg_test1 from '../../assets/images/popular_spot_1.svg';
import svg_test2 from '../../assets/images/popular_spot_2.svg';
import png_test1 from '../../assets/images/dongdaemun.png';
import png_test2 from '../../assets/images/castle.png';
import { CardDataType } from '../../types/CardCarouselDataType';

const TestPopularSpotCardPage = () => {
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
    <div className={styles.test}>
      <CardCarouselComponent cardData={cardData} />
    </div>
  );
};

export default TestPopularSpotCardPage;
