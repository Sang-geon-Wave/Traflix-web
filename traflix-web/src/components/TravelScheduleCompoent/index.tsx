import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { TravelCardDataType } from '../../types/TravelCardType';
import TravelCardComponent from '../TravelCardComponent';

export interface PropsTravelScheduleComponent {
  travelSchedule: TravelCardDataType[];
}

const TravelScheduleComponent: React.FunctionComponent<
  PropsTravelScheduleComponent
> = ({ travelSchedule }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return (
    <div>
      {travelSchedule.map((element: TravelCardDataType, index) => (
        <div>
          <TravelCardComponent
            key={index}
            title={element.title}
            subtitle={element.subtitle}
            img={element.img}
            load={element.load}
            moreInfo={element.moreInfo}
            travelType={element.travelType}
          />
        </div>
      ))}
    </div>
  );
};

export default TravelScheduleComponent;
