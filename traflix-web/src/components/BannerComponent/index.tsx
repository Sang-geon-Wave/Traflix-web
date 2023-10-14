import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import imgData from '../../assets/string/bannerComponent/imgData';

const BannerComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;
  const intervalValue = 3000;
  return (
    <div className={styles.banner}>
      <Carousel
        fade
        indicators={false}
        controls={false}
        className={styles.mainCarousel}
      >
        {imgData.map((imgData, i) => (
          <Carousel.Item key={i} interval={intervalValue}>
            <div className={styles.imgBox}>
              <img src={imgData} className={styles.imageFit} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerComponent;
