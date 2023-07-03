import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';

export interface PropsPopularSpotCardComponent {}

const PopularSpotCardComponent: React.FunctionComponent<
  PropsPopularSpotCardComponent
> = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return <></>;
};

export default PopularSpotCardComponent;
