import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import imgData from '../../assets/string/bannerComponent/imgData';

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
        {imgData.map((imgData, i) => (
          <Carousel.Item interval={intervalValue}>
            <div key={i} className={styles.imgBox}>
              <img src={imgData} className={styles.imageFitWidth} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerComponent;
