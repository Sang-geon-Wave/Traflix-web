import React from 'react';
import useRootData from '../../hooks/useRootData';
import MockComponent from '../../components/MockComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import SummaryComponent from '../../components/SummaryComponent';
import SummaryTestData from '../../assets/string/summarycomponent/testData';

const SummaryTestPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div>
      <SummaryComponent date={'7월 23일'} summaryData={SummaryTestData} />
    </div>
  );
};

export default SummaryTestPage;
