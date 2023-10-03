import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import closeImg from '../../assets/images/x.svg';
import contentDetailData from '../../assets/string/ContentDetailModalComponent/testData';
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
              <div className={styles.contentTitle}>전화명</div>
              <div className={styles.contentText}>{content.telname}</div>
              <div className={styles.contentTitle}>홈페이지</div>
              <div className={styles.contentText}>{content.homepage}</div>
              <div className={styles.contentTitle}>우편번호</div>
              <div className={styles.contentText}>{content.zipcode}</div>
              {Object.keys(contentDetailData[content.contentType]).map(
                (key) => (
                  <div key={key}>
                    <div className={styles.contentTitle}>
                      {contentDetailData[content.contentType][key]}
                    </div>
                    <div className={styles.contentText}>
                      {content.intro[key] === ''
                        ? '정보 없음'
                        : content.intro[key]}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetailModalComponent;
