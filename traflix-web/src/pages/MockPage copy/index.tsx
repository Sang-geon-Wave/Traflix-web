import React, { useState, useEffect, useCallback } from 'react';
import useRootData from '../../hooks/useRootData';
import MockComponent from '../../components/MockComponent';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import SelectComponent from '../../components/SelectComponent';
import UseSelectComponent from '../../components/UseSelectComponent';

const TestSelectPage = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  // const onClick = useCallback(() => {
  //   showModal(true);
  // }, [modalOption]);

  return (
    <div>
      <button onClick={handleShowModal}>test</button>
      <SelectComponent isOpen={isOpen} handleShowModal={handleShowModal} />
    </div>
  );
};

export default TestSelectPage;
