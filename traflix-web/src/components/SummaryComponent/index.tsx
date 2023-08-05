import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { SummaryDataType } from '../../types/SummaryDataType';
import rightArrow from '../../assets/images/arrow-right-short.svg';
import rightArrow2 from '../../assets/images/right-arrow.png';

export interface PropsSummaryComponent {
  summaryData: SummaryDataType[];
}

const SummaryComponent: React.FunctionComponent<PropsSummaryComponent> = ({
  date,
  summaryData,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div className={styles.mainBlock}>
      <div className={styles.title}>{date} 내일로 여행 추천 여정</div>
      <div className={styles.summaryBlock}>
        {summaryData.map((data, index) => (
          <div>
            <div className={styles.middle}>
              <div className={styles.summaryCard}>
                <div>{data.place}</div>
                <div>{data.time}</div>
              </div>
              {index < summaryData.length - 1 && (
                <img src={rightArrow} alt="Arrow" className={styles.arrow} />
              )}
            </div>
            {index < summaryData.length - 1 ? (
              <div className={styles.test1}>hi</div>
            ) : (
              <div className={styles.test2}>hi</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryComponent;
