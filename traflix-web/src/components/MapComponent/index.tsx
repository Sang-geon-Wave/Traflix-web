import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import config from '../../config';

export interface PropsMapComponent {
  message: string;
  highlight: boolean;
}

const MapComponent: React.FunctionComponent<PropsMapComponent> = ({
  message,
  highlight,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(windowSize);

  const [mapStyle, setMapStyle] = useState({
    width: '100%',
    height: '100vh',
  });

  const positions = [
    {
      title: '더덕이집',
      latlng: { lat: 37.60986651554067, lng: 126.99715728022538 },
    },
    {
      title: '더덕밥집',
      latlng: { lat: 37.61225413018318, lng: 126.99689669275067 },
    },
    {
      title: '더덕침대',
      latlng: { lat: 37.61274956048608, lng: 126.99396323453894 },
    },
  ];

  return (
    <div>
      <Map center={{ lat: 37.6111, lng: 126.9965 }} style={mapStyle}>
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {positions.map((position, index) => (
          <MapMarker
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
          >
            <div style={{ color: '#000' }}>{position.title}</div>
          </MapMarker>
        ))}
        <Polyline
          path={positions.map((position) => position.latlng)}
          strokeWeight={5} // 선의 두께 입니다
          strokeColor={'#FFAE00'} // 선의 색깔입니다
          strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={'solid'} // 선의 스타일입니다
        />
      </Map>
    </div>
  );
};

export default MapComponent;
