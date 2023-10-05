import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsFooterComponent {}

const FooterComponent: React.FunctionComponent<ProbsFooterComponent> = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      <footer className="py-3 bg-light">
        <p className="text-center text-muted">© 2023 Team Traflix</p>
      </footer>
    </div>
  );
};

export default FooterComponent;
