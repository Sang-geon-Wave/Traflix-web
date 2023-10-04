import React, { useRef, useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
// import stylesMobileDefault from './MobileDefault.module.scss';
import { Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import map from '../../stores/map';
import { toJS } from 'mobx';

export interface PropsMapComponent {
  pathCoordinates: MapCoordinateDataType[][];
}

const MapComponent: React.FunctionComponent = () => {
  const { screenClass, places } = useRootData(({ appStore, map }) => ({
    screenClass: appStore.screenClass.get(),
    places: map.places,
  }));
  useKakaoLoader();

  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;

  const pathCoordinates = toJS(places);
  const [mapStyle, setMapStyle] = useState({
    width: '100%',
    height: '100%',
  });

  let centerCoordinate = { lat: 36.45, lng: 127.85 };
  // if (pathCoordinates.length != 0) {
  //   // centerCoordinate = {
  //   //   lat:
  //   //     pathCoordinates[0].reduce(
  //   //       (sum, coordinate) => sum + coordinate.lat,
  //   //       0,
  //   //     ) / pathCoordinates.length,
  //   //   lng:
  //   //     pathCoordinates[0].reduce(
  //   //       (sum, coordinate) => sum + coordinate.lng,
  //   //       0,
  //   //     ) / pathCoordinates.length,
  //   // };
  // }

  const randomRgb = function () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return [r, g, b];
  };

  const randomRgbHex = function () {
    let [r, g, b] = randomRgb();

    const newR =
      r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16);
    const newG =
      g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16);
    const newB =
      b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16);

    return newR + newG + newB;
  };

  return (
    <div className="w-100 h-100">
      <Map
        center={{ lat: centerCoordinate.lat, lng: centerCoordinate.lng }}
        style={mapStyle}
        level={12}
      >
        <ZoomControl position={'TOPRIGHT'} />
        {pathCoordinates.map((pathCoordinate) =>
          pathCoordinate.map((coordinate, index) => (
            <MapMarker
              key={`marker-${index}`}
              position={{ lat: coordinate.lat, lng: coordinate.lng }}
            >
              <div className={styles.markerText}>{coordinate.placeName}</div>
            </MapMarker>
          )),
        )}

        {pathCoordinates.map((pathCoordinate) => (
          <Polyline
            path={pathCoordinate.map((coordinate) => ({
              lat: coordinate.lat,
              lng: coordinate.lng,
            }))}
            strokeWeight={5}
            strokeColor={`#${randomRgbHex()}`}
            strokeOpacity={0.5}
            strokeStyle={'solid'}
          />
        ))}
      </Map>
    </div>
  );
};

export default MapComponent;
