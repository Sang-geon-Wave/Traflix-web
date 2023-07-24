import PopularSpotCardComponent from '../../components/PopularSpotCardComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { CardDataType } from '../../types/CardCarouselDataType';
import React, { TouchEventHandler, useEffect, useState } from 'react';

export interface PropsCardCarouselComponent {
  cardData: CardDataType[];
}
const CardCarouselComponent: React.FunctionComponent<
  PropsCardCarouselComponent
> = ({ cardData }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  let touchStartX: number;
  let touchEndX: number;
  let clickStartX: number;
  let clickEndX: number;

  const [currIndex, setCurrIndex] = useState(0);

  const prevButtonClicked = () => {
    setCurrIndex(() => {
      if (currIndex <= 0) {
        if (isDesktop) return cardData.length - 2;
        if (!isDesktop) return cardData.length - 1;
      }
      return currIndex - 1;
    });
  };
  const nextButtonClicked = () => {
    setCurrIndex(() => {
      if (isDesktop && currIndex >= cardData.length - 2) return 0;
      if (!isDesktop && currIndex >= cardData.length - 1) return 0;
      return currIndex + 1;
    });
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX > touchEndX) {
      nextButtonClicked();
    } else if (touchStartX < touchEndX) {
      prevButtonClicked();
    }
  };
  const handleClickStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    clickStartX = e.nativeEvent.clientX;
  };
  const handleClickEnd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    clickEndX = e.nativeEvent.clientX;

    if (clickStartX > clickEndX) {
      nextButtonClicked();
    } else if (clickStartX < clickEndX) {
      prevButtonClicked();
    }
  };

  return (
    <div
      className={styles.container}
      onMouseDown={handleClickStart}
      onMouseUp={handleClickEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles.prev} onClick={() => prevButtonClicked()}>
        &lang;
      </button>
      <button className={styles.next} onClick={() => nextButtonClicked()}>
        &rang;
      </button>
      <div
        className={styles.carousel}
        style={
          isDesktop
            ? { transform: `translateX(-${currIndex * 42}vw)` }
            : { transform: `translateX(-${currIndex * 92}vw)` }
        }
      >
        {cardData.map((cardData) => (
          <PopularSpotCardComponent
            key={cardData.place}
            imgUrl={cardData.imgUrl}
            place={cardData.place}
            addr={cardData.addr}
            info={cardData.info}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarouselComponent;
