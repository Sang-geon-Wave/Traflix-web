import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import aeyoungImg from '../../assets/images/aeyung.jpg';
import closeImg from '../../assets/images/x.svg';
import { ContentDetailDataType } from '../../types/ContentDetailDataType';
// import stylesMobileDefault from './MobileDefault.module.scss';

export interface PropsContentDetailModalComponent {}

const ContentDetailModalComponent: React.FunctionComponent<
  PropsContentDetailModalComponent
> = ({}) => {
  const { screenClass, contentShow, handleContentClose, content } = useRootData(
    ({ appStore, contentModal }) => ({
      screenClass: appStore.screenClass.get(),
      contentShow: contentModal.contentShow.get(),
      handleContentClose: contentModal.handleContentClose,
      content: contentModal.content.get(),
    }),
  );
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const contentName = {
    '12': '관광지',
    '14': '문화시설',
    '15': '행사/공연/축제',
    '25': '여행코스',
    '28': '레포츠',
    '32': '숙박',
    '38': '쇼핑',
    '39': '음식점',
  };
  const detailIntro: { [key: string]: { [key: string]: string } } = {
    '12': {
      infocenter: '문의 및 안내',
      opendate: '개장일',
      restdate: '쉬는날',
      parking: '주차시설',
      usetime: '이용시간',
    },
    '14': {
      infocenterculture: '문의 및 안내',
      restdateculture: '쉬는날',
      parkingculture: '주차시설',
      usetimeculture: '이용시간',
      usefee: '이용요금',
      discountinfo: '할인정보',
    },
  };

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
            <img className={styles.titleImg} src={content.img} />
            <div className={styles.titleBox}>
              <div className={styles.type}>{contentName['14']}</div>
              <div className={styles.title}>{content.title}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>상세 정보</div>
              <div className={styles.contentText}>{content.overview}</div>
              <div className={styles.contentTitle}>주소</div>
              <div className={styles.contentText}>{content.addr}</div>
              <div className={styles.contentTitle}>전화번호</div>
              <div className={styles.contentText}>{content.tel}</div>
              {Object.keys(detailIntro['14']).map((key: string) => (
                <div>
                  <div className={styles.contentTitle}>
                    {detailIntro['14'][key]}
                  </div>
                  <div className={styles.contentText}>{[key]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetailModalComponent;
