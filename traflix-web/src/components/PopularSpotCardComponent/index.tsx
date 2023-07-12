import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { CardDataType } from '../../types/CardCarouselDataType';

const PopularSpotCardComponent: React.FunctionComponent<CardDataType> = ({
  imgUrl,
  place,
  addr,
  info,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.card}>
      <li>
        <img src={imgUrl} />
        <div className={styles.caption}>
          <h3>{place}</h3>
          <p>{addr}</p>
          <p>{info}</p>
        </div>
      </li>
    </div>
  );
};

export default PopularSpotCardComponent;
