import { CardDataType } from '../../../types/CardCarouselDataType';
import svg_test1 from '../../images/popular_spot_1.svg';
import svg_test2 from '../../images/popular_spot_2.svg';
import png_test1 from '../../images/castle.png';
import png_test2 from '../../images/dongdaemun.png';
const cardData: CardDataType[] = [
  {
    imgUrl: png_test1,
    place: '1',
    addr: '1',
    info: '1',
  },
  {
    imgUrl: png_test2,
    place: '2',
    addr: '2',
    info: '2',
  },
  {
    imgUrl: svg_test1,
    place: '3',
    addr: '3',
    info: '3',
  },
  {
    imgUrl: svg_test2,
    place: '4',
    addr: '4',
    info: '4',
  },
];

export default cardData;
