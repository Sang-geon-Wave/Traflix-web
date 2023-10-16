import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import { toJS } from 'mobx';

import markerTrain from '../../assets/images/marker/marker_train.png';
import markerType12 from '../../assets/images/marker/marker_type12.png';
import markerType14 from '../../assets/images/marker/marker_type14.png';
import markerType15 from '../../assets/images/marker/marker_type15.png';
import markerType28 from '../../assets/images/marker/marker_type28.png';
import markerType32 from '../../assets/images/marker/marker_type32.png';
import markerType38 from '../../assets/images/marker/marker_type38.png';
import markerType39 from '../../assets/images/marker/marker_type39.png';

export interface PropsMapComponent {}

const MapComponent: React.FunctionComponent<PropsMapComponent> = ({}) => {
  const { screenClass, places } = useRootData(({ appStore, map }) => ({
    screenClass: appStore.screenClass.get(),
    places: toJS(map.places),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  useKakaoLoader();

  const mapRef = useRef<kakao.maps.Map>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (map) map.relayout();
  }, [screenClass]);

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
    '12': markerType12,
    '14': markerType14,
    '15': markerType15,
    '28': markerType28,
    '32': markerType32,
    '38': markerType38,
    '39': markerType39,
  };

  const mapCoordinateType = (mapCoordinate: MapCoordinateDataType) => {
    return (
      <MapMarker
        key={`key-${mapCoordinate.placeName}`}
        position={{ lat: mapCoordinate.lat, lng: mapCoordinate.lng }}
        image={{
          src: mapCoordinate.contentType
            ? contentUrl[mapCoordinate.contentType]
            : markerTrain,
          size: { width: 24, height: 30 },
        }}
      >
        {/* <div className={styles.markerText}>{mapCoordinate.placeName}</div> */}
      </MapMarker>
    );
  };

  const polyLine = (
    pathCoordinate: MapCoordinateDataType[],
    keyValue: Number,
  ) => {
    return (
      <div key={`line-${keyValue}`}>
        <Polyline
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
        draggable={true}
        ref={mapRef}
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
