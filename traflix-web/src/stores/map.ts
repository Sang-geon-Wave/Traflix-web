import { observable } from 'mobx';
import { MapCoordinateDataType } from '../types/MapCoordinateDataType';

let maps: MapCoordinateDataType[][];

const createStore = () => {
  const map = {
    places: observable.array(maps),

    handleMapAdd(contents: MapCoordinateDataType[]) {
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
