import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsMockComponent {
  message: string;
  highlight: boolean;
}

const MockComponent: React.FunctionComponent<ProbsMockComponent> = ({
  message,
  highlight,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return highlight ? (
    <div className={styles.highlightMessage}>{message}</div>
  ) : (
    <div className={styles.message}>{message}</div>
  );
};

export default MockComponent;
