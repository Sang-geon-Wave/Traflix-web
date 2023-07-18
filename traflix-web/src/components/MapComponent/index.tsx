import React, { useEffect, useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';

export interface PropsMapComponent {
  pathCoordinates: MapCoordinateDataType[];
}

const MapComponent: React.FunctionComponent<PropsMapComponent> = ({
  pathCoordinates,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const [mapStyle, setMapStyle] = useState({
    width: '100%',
    height: '100vh',
  });

  const centerCoordinate = {
    lat:
      pathCoordinates.reduce((sum, coordinate) => sum + coordinate.lat, 0) /
      pathCoordinates.length,
    lng:
      pathCoordinates.reduce((sum, coordinate) => sum + coordinate.lng, 0) /
      pathCoordinates.length,
  };

  return (
    <div>
      <Map
        center={{ lat: centerCoordinate.lat, lng: centerCoordinate.lng }}
        style={mapStyle}
        level={12}
      >
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        {pathCoordinates.map((coordinate, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
          >
            <div className={styles.markerText}>{coordinate.placeName}</div>
          </MapMarker>
        ))}
        <Polyline
          path={pathCoordinates.map((coordinate) => ({
            lat: coordinate.lat,
            lng: coordinate.lng,
          }))}
          strokeWeight={5}
          strokeColor={'#FFAE00'}
          strokeOpacity={0.7}
          strokeStyle={'solid'}
        />
      </Map>
    </div>
  );
};

export default MapComponent;
