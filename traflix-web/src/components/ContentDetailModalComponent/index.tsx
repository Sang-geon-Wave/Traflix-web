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
    '15': {
      placeinfo: '행사장 위치',
      eventplace: '행사 장소',
      eventstartdate: '행사 시작일',
      eventenddate: '행사 종료일',
      bookingplace: '예매처',
      agelimit: '관람 가능연령',
    },
    '25': {
      schedule: '코스 일정',
      theme: '코스 테마',
      infocentertourcourse: '문의 및 안내',
    },
    '28': {
      openperiod: '개장기간',
      restdateleports: '쉬는날',
      usefeeleports: '입장료',
      parkingleports: '주차시설',
      expagerangeleports: '체험 가능연령',
      infocenterleports: '문의 및 안내',
    },
    '32': {
      accomcountlodging: '수용 가능인원',
      checkintime: '입실 시간',
      checkouttime: '퇴실 시간',
      pickup: '픽업 서비스',
      chkcooking: '객실내 취사 여부',
      parkinglodging: '주차 시설',
      reservationlodging: '예약 안내',
      reservationurl: '예약안내 홈페이지',
      infocenterlodging: '문의 및 안내',
    },
    '38': {
      chkcreditcardshopping: '신용카드가능 정보',
      opendateshopping: '개장일',
      opentime: '영업시간',
      restdateshopping: '쉬는날',
      parkingshopping: '주차시설',
      infocentershopping: '문의 및 안내',
    },
    '39': {
      chkcreditcardfood: '신용카드가능 정보',
      firstmenu: '대표 메뉴',
      opendatefood: '개업일',
      opentimefood: '영업시간',
      restdatefood: '쉬는날',
      packing: '포장 가능',
      infocenterfood: '문의 및 안내',
    },
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
              {Object.keys(detailIntro[content.contentType]).map((key) => (
                <div key={key}>
                  <div className={styles.contentTitle}>
                    {detailIntro[content.contentType][key]}
                  </div>
                  <div className={styles.contentText}>
                    {content.intro[key] === ''
                      ? '정보 없음'
                      : content.intro[key]}
                  </div>
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
