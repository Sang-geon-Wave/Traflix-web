import PopularSpotCardComponent from '../../components/PopularSpotCardComponent';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { CardDataType } from '../../types/CardCarouselDataType';
import { TouchEventHandler, useState, useRef, useEffect } from 'react';

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

  const [currIndex, setCurrIndex] = useState(0);

  const carouselRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (carouselRef.current !== null) {
      if (isDesktop)
        carouselRef.current.style.transform = `translateX(-${
          currIndex * 42
        }vw)`;
      else
        carouselRef.current.style.transform = `translateX(-${
          currIndex * 92
        }vw)`;
    }
  }, [currIndex]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 10);
  };
  const prevButtonClicked = () => {
    const newIndex = currIndex - 1;

    if (newIndex === -1) {
      if (isDesktop) moveToNthSlide(cardData.length - 2);
      if (!isDesktop) moveToNthSlide(cardData.length - 1);
    }

    setCurrIndex((prev) => prev - 1);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };
  const nextButtonClicked = () => {
    const newIndex = currIndex + 1;

    if (isDesktop && newIndex === cardData.length - 1) moveToNthSlide(0);
    if (!isDesktop && newIndex === cardData.length) moveToNthSlide(0);

    setCurrIndex((prev) => prev + 1);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (carouselRef.current !== null) {
      // if (isDesktop)
      //   carouselRef.current.style.transform = `translateX(calc(-${
      //     currIndex * 42
      //   }vw`; // - ${touchStartX - currTouchX || 0}px)))`;
      // if (!isDesktop)
      //   carouselRef.current.style.transform = `translateX(calc(-${
      //     currIndex * 92
      //   }vw`; // - ${touchStartX - currTouchX || 0}px)))`;
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      nextButtonClicked();
    } else {
      prevButtonClicked();
    }
  };

  return (
    <div
      className={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // onScroll={}
    >
      <button className={styles.prev} onClick={() => prevButtonClicked()}>
        &lang;
      </button>
      <button className={styles.next} onClick={() => nextButtonClicked()}>
        &rang;
      </button>
      <ul className={styles.carousel} ref={carouselRef}>
        {cardData.map((cardData) => (
          <PopularSpotCardComponent
            imgUrl={cardData.imgUrl}
            place={cardData.place}
            addr={cardData.addr}
            info={cardData.info}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardCarouselComponent;
