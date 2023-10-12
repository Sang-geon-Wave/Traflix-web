import React, { useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import { toJS } from 'mobx';

import culture from '../../assets/images/contentIcon/culture.svg';
import castle from '../../assets/images/contentIcon/castle.svg';
import sport from '../../assets/images/contentIcon/sport.svg';
import festival from '../../assets/images/contentIcon/festival.svg';
import lodgment from '../../assets/images/contentIcon/lodgment.svg';
import shopping from '../../assets/images/contentIcon/shopping.svg';
import restaurant from '../../assets/images/contentIcon/restaurant.svg';

export interface PropsMapComponent {}

const MapComponent: React.FunctionComponent<PropsMapComponent> = ({}) => {
  const { screenClass, places } = useRootData(({ appStore, map }) => ({
    screenClass: appStore.screenClass.get(),
    places: toJS(map.places),
  }));
  useKakaoLoader();

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const pathCoordinates = places;
  const [mapStyle, setMapStyle] = useState({
    width: '100%',
    height: '100%',
  });

  let centerCoordinate = { lat: 36.45, lng: 127.85 };

  const randomRgbHex = function () {
    const colorArray = [
      '#ffc107',
      '#607D8B',
      '#2196F3',
      '#795548',
      '#00BCD4',
      '#FF5722',
      '#673AB7',
      '#4CAF50',
    ];

    const random = Math.floor(Math.random() * colorArray.length);

    return colorArray[random];
  };

  const contentUrl: { [key: string]: string } = {
    '12': castle,
    '14': culture,
    '15': festival,
    '28': sport,
    '32': lodgment,
    '38': shopping,
    '39': restaurant,
  };

  const mapCoordinateType = (mapCoordinate: MapCoordinateDataType) => {
    return (
      <MapMarker
        key={`key-${mapCoordinate.placeName}`}
        position={{ lat: mapCoordinate.lat, lng: mapCoordinate.lng }}
        image={{
          src: mapCoordinate.contentType
            ? contentUrl[mapCoordinate.contentType]
            : 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          size: { width: 25, height: 25 },
        }}
      >
        <div className={styles.markerText}>{mapCoordinate.placeName}</div>
      </MapMarker>
    );
  };

  const polyLine = (
    pathCoordinate: MapCoordinateDataType[],
    keyValue: Number,
  ) => {
    return (
      <div>
        <Polyline
          key={`line-${keyValue}`}
          path={pathCoordinate
            .filter((coordinate) => coordinate.isTrain)
            .map((coordinate) => ({
              lat: coordinate.lat,
              lng: coordinate.lng,
            }))}
          strokeWeight={5}
          strokeColor={`${randomRgbHex()}`}
          strokeOpacity={0.7}
          strokeStyle={'solid'}
        />
        {pathCoordinate.map((coordinate) => mapCoordinateType(coordinate))}
      </div>
    );
  };

  return (
    <div className="w-100 h-100">
      <Map
        center={{ lat: centerCoordinate.lat, lng: centerCoordinate.lng }}
        style={mapStyle}
        level={12}
      >
        <ZoomControl position={'TOPRIGHT'} />
        {pathCoordinates.map((pathCoordinate, idx) =>
          polyLine(pathCoordinate, idx),
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
