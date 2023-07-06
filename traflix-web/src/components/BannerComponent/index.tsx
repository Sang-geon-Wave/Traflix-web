import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Carousel from 'react-bootstrap/Carousel';
// import stylesMobileDefault from './MobileDefault.module.scss';

import img1 from '../../../public/castle.png';
import img2 from '../../../public/dongdaemun.png';
import img3 from '../../../public/jeju.png';

const BannerComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const intervalValue = 3000;
  return (
    <div className={styles.banner}>
      <Carousel fade indicators={false} controls={false}>
        <Carousel.Item interval={intervalValue}>
          <img className="d-block w-100" src={img1} />
        </Carousel.Item>
        <Carousel.Item interval={intervalValue}>
          <img className="d-block w-100" src={img2} />
        </Carousel.Item>
        <Carousel.Item interval={intervalValue}>
          <img className="d-block w-100" src={img3} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerComponent;
