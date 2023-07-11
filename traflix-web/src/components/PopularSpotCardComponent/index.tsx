import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface PropsPopularSpotCardComponent {
  imgUrl: string;
  place: string;
  addr: string;
  info: string;
}

const PopularSpotCardComponent: React.FunctionComponent<
  PropsPopularSpotCardComponent
> = ({ imgUrl, place, addr, info }) => {
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
          <h2>{place}</h2>
          <p>{addr}</p>
          <p>{info}</p>
        </div>
      </li>
    </div>
  );
};

export default PopularSpotCardComponent;
