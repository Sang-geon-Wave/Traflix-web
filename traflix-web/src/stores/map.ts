import { observable } from 'mobx';
import { MapCoordinateDataType } from '../types/MapCoordinateDataType';

const maps: MapCoordinateDataType[] = [
  {
    placeName: '더덕이집',
    lat: 37.60986651554067,
    lng: 126.99715728022538,
  },
];

const createStore = () => {
  const map = {
    places: observable.array(maps),

    handleMapAdd(contents: MapCoordinateDataType) {
      map.places.push(contents);
    },
    handleMapClear() {
      map.places.clear();
    },
  };

  return map;
};

const store = createStore();
export default store;
