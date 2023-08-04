import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { SummaryDataType } from '../../types/SummaryDataType';

export interface PropsSummaryComponent {
  summaryData: SummaryDataType[];
}

const SummaryComponent: React.FunctionComponent<PropsSummaryComponent> = ({
  summaryData,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  return <div>hi</div>;
};

export default SummaryComponent;
