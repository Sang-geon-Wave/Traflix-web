import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import aeyoungImg from '../../assets/images/aeyung.jpg';
import closeImg from '../../assets/images/x.svg';
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

  const contentName: { [key: string]: string } = {
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
    // 아래로 쭉 전부다 추가하고 83 ~ 85번째 줄 주석 해제하고 86번 없애라
  };

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
              <div className={styles.type}>
                {contentName[content.contentType]}
              </div>
              <div className={styles.title}>{content.title}</div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>상세 정보</div>
              <div className={styles.contentText}>{content.overview}</div>
              <div className={styles.contentTitle}>주소</div>
              <div className={styles.contentText}>{content.addr}</div>
              <div className={styles.contentTitle}>전화번호</div>
              <div className={styles.contentText}>{content.tel}</div>
              {Object.entries(content.intro).map(([key, value]) => (
                <div key={key}>
                  {/* <div className={styles.contentTitle}>
                    {detailIntro[content.contentType][key[0]]}
                  </div> */}
                  <div className={styles.contentTitle}>{key}</div>
                  <div className={styles.contentText}>{value}</div>
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
