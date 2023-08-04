import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { TravelCardDataType } from '../../types/TravelCardType';

const TravelCardComponent: React.FunctionComponent<TravelCardDataType> = ({
  img,
  title,
  subtitle,
  load,
  moreInfo,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.main}>
      <img src={img} className={styles.img} />
      <div className={styles.content}>
        <div>
          <h1>{title}</h1>
          <span>{subtitle}</span>
        </div>
        <div className={styles.linkBox}>
          <a href={load} className={styles.links}>
            길찾기
          </a>
          <a href={moreInfo} className={styles.links}>
            자세히보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default TravelCardComponent;
