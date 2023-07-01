import React from 'react';
import useRootData from '../../hooks/useRootData';
import MockComponent from '../../components/MockComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';

const MockPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return <MockComponent message={'hello, world'} highlight={true} />;
};

export default MockPage;
