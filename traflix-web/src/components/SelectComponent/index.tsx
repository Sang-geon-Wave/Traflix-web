import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import aeyoungImg from '../../assets/images/aeyung.jpg';
import closeImg from '../../assets/images/x.svg';
import { SelectCardDataType } from '../../types/SelectCardDataType';
import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsSelectComponent {
  start: string;
  destination: string;
  startDate: string;
  selectCardData: SelectCardDataType[];
}

const SelectComponent: React.FunctionComponent<PropsSelectComponent> = ({
  start,
  destination,
  startDate,
  selectCardData,
}) => {
  const { screenClass, optionShow, handleOptionClose } = useRootData(
    ({ appStore, optionModal }) => ({
      screenClass: appStore.screenClass.get(),
      optionShow: optionModal.optionShow.get(),
      handleOptionClose: optionModal.handleOptionClose,
    }),
  );
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const contentName: { [key: string]: string } = {
    '12': '관광지',
    '14': '문화시설',
    '15': '행사/공연/축제',
    '28': '레포츠',
    '32': '숙박',
    '38': '쇼핑',
    '39': '음식점',
  };

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextButton = () => {
    handleOptionClose();
    navigate('/directions', {
      state: {
        start: start,
        destination: destination,
        startDate: startDate,
        option: selectedOptions,
      },
    });
    setSelectedOptions([]);
  };

  return (
    <div>
      {optionShow && (
        <div className={styles.modalBackground}>
          <div className={styles.select}>
            <img
              src={closeImg}
              onClick={handleOptionClose}
              className={styles.close}
            />
            <div className={styles.title}>선호하는 여행 취향을 골라주세요!</div>
            <div className={styles.subTitle}>
              총 <span>{selectedOptions.length}</span>/7개 선택됨
            </div>
            <div className={styles.cardBox}>
              {selectCardData.map((selectCardData) => (
                <button
                  key={selectCardData.tag}
                  className={
                    selectedOptions.includes(selectCardData.tag)
                      ? styles.cardActive
                      : styles.card
                  }
                  onClick={() => handleOptionToggle(selectCardData.tag)}
                >
                  <img className={styles.cardImg} src={selectCardData.img} />
                  <div className={styles.cardText}>
                    {contentName[selectCardData.tag]}
                  </div>
                </button>
              ))}
            </div>
            <div className={styles.buttonBox}>
              <button
                className={styles.nextButton}
                onClick={() => {
                  handleNextButton();
                }}
              >
                경로 추천
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
