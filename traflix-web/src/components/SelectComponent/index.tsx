import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import aeyoungImg from '../../assets/images/aeyung.jpg';
import closeImg from '../../assets/images/x.svg';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface ProbsSelectComponent {
  options: [];
}

const SelectComponent: React.FunctionComponent<ProbsSelectComponent> = ({
  options,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleShowModal = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleModalClose = () => {
    setSelectedOptions([]);
  };
  const handleNextButton = () => {
    options = selectedOptions;
    setIsOpen(!isOpen);
    setSelectedOptions([]);
  };

  const selectType = ['액티비티', '카페', '산', '축제', '문화 | 역사'];

  return (
    <div>
      <button onClick={handleShowModal}>test</button>
      {isOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.select}>
            <button
              className={styles.close}
              onClick={() => {
                handleShowModal();
                handleModalClose();
              }}
            >
              <img src={closeImg}></img>
            </button>
            <div className={styles.title}>선호하는 여행 취향을 골라주세요!</div>
            <div className={styles.subTitle}>
              총 <span>{selectedOptions.length}</span>/5개 선택됨
            </div>
            <div className={styles.cardBox}>
              {selectType.map((type: string) => (
                <button
                  key={type}
                  className={
                    selectedOptions.includes(type)
                      ? styles.cardActive
                      : styles.card
                  }
                  onClick={() => handleOptionToggle(type)}
                >
                  <div>
                    <img className={styles.cardImg} src={aeyoungImg}></img>
                  </div>
                  <div className={styles.cardText}>{type}</div>
                </button>
              ))}
            </div>
            <div className={styles.buttonBox} onClick={handleNextButton}>
              <button className={styles.nextButton}>다음</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
