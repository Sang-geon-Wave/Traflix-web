import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import aeyoungImg from '../../assets/images/aeyung.jpg';
import closeImg from '../../assets/images/x.svg';
import { ContentDetailDataType } from '../../types/ContentDetailDataType';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsContentDetailModalComponent {
  contentDetailData: ContentDetailDataType;
  isOpen: boolean;
}

const ContentDetailModalComponent: React.FunctionComponent<
  PropsContentDetailModalComponent
> = ({ isOpen, contentDetailData }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
    // options = selectedOptions;
    setSelectedOptions([]);
  };

  return (
    <div>
      {
        <div className={styles.main}>
          <button
            className={styles.close}
            onClick={() => {
              handleModalClose();
            }}
          >
            <img src={closeImg}></img>
          </button>
          <div className={styles.contentBox}>
            <img className={styles.titleImg} src={contentDetailData.img} />
            <div className={styles.titleBox}>
              <div className={styles.type}>{contentDetailData.contentType}</div>
              <div className={styles.title}>{contentDetailData.title}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>상세 정보</div>
              <div className={styles.contentText}>
                {contentDetailData.detail}
              </div>
              <div className={styles.contentTitle}>주소</div>
              <div className={styles.contentText}>
                {contentDetailData.address}
              </div>
              <div className={styles.contentTitle}>전화번호</div>
              <div className={styles.contentText}>{contentDetailData.tel}</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ContentDetailModalComponent;
