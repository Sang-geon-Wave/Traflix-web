import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import logoImg from '../../assets/images/logo.svg';
import listImg from '../../assets/images/list.svg';
// import stylesMobileDefault from './MobileDefault.module.scss';

const SelectComponent = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(true);

  const showModal = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={showModal}>test</button>
      {isOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.select}>
            <button className={styles.close} onClick={showModal}>
              x
            </button>
            <div className={styles.title}>선호하는 여행 취향을 골라주세요!</div>
            <div className={styles.subTitle}>보조 타이틀</div>
            <div className={styles.cardBox}>카드박스</div>
            <div className={styles.buttonBox}>
              <button className={styles.nextButton}>다음</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
