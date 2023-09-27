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
}

const ContentDetailModalComponent: React.FunctionComponent<
  PropsContentDetailModalComponent
> = ({ contentDetailData }) => {
  const { screenClass, contentShow, handleContentClose } = useRootData(
    ({ appStore, contentModal }) => ({
      screenClass: appStore.screenClass.get(),
      contentShow: contentModal.contentShow.get(),
      handleContentClose: contentModal.handleContentClose,
    }),
  );
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const navigate = useNavigate();

  return (
    <div>
      {contentShow && (
        <div className={styles.main}>
          <button
            className={styles.close}
            onClick={() => {
              handleContentClose();
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
                {contentDetailData.title}
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
      )}
    </div>
  );
};

export default ContentDetailModalComponent;
