import React from 'react';
import useRootData from '../../hooks/useRootData';
import { useState, useCallback } from 'react';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { set } from 'mobx';
// import stylesMobileDefault from './MobileDefault.module.scss';

const OPTION = {
  isOpen: false,
};

const UseSelectComponent = ({}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [modalOption, setModalOption] = useState(OPTION);

  const showModal = useCallback(
    (isOpen) => {
      setModalOption((prev) => ({
        ...prev,
        isOpen,
      }));
    },
    [modalOption],
  );
  return [modalOption, setModalOption];
};

export default UseSelectComponent;
