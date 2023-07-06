import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import logo from '../../assets/images/logo.svg';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsMockComponent {
  message: string;
  highlight: boolean;
}

const HeaderComponent = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.contents}>
        <img className={styles.logo} src={logo} onClick={() => navigate('/')} />
        <nav className={styles.navigation}>
          <ul>
            <li>메뉴1</li>
            <li>메뉴2</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderComponent;
