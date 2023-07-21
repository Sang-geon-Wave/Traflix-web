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
              <button
                className={
                  selectedOptions.includes('액티비티')
                    ? styles.cardActive
                    : styles.card
                }
                onClick={() => handleOptionToggle('액티비티')}
              >
                <div>
                  <img className={styles.cardImg} src={aeyoungImg}></img>
                </div>
                <div className={styles.cardText}>액티비티</div>
              </button>
              <button
                className={
                  selectedOptions.includes('카페')
                    ? styles.cardActive
                    : styles.card
                }
                onClick={() => handleOptionToggle('카페')}
              >
                <div>
                  <img className={styles.cardImg} src={aeyoungImg}></img>
                </div>
                <div className={styles.cardText}>카페</div>
              </button>
              <button
                className={
                  selectedOptions.includes('산')
                    ? styles.cardActive
                    : styles.card
                }
                onClick={() => handleOptionToggle('산')}
              >
                <div>
                  <img className={styles.cardImg} src={aeyoungImg}></img>
                </div>
                <div className={styles.cardText}>산</div>
              </button>
              <button
                className={
                  selectedOptions.includes('축제')
                    ? styles.cardActive
                    : styles.card
                }
                onClick={() => handleOptionToggle('축제')}
              >
                <div>
                  <img className={styles.cardImg} src={aeyoungImg}></img>
                </div>
                <div className={styles.cardText}>축제</div>
              </button>
              <button
                className={
                  selectedOptions.includes('문화 | 역사')
                    ? styles.cardActive
                    : styles.card
                }
                onClick={() => handleOptionToggle('문화 | 역사')}
              >
                <div>
                  <img className={styles.cardImg} src={aeyoungImg}></img>
                </div>
                <div className={styles.cardText}>문화 | 역사</div>
              </button>
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
