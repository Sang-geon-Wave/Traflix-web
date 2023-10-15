import { CardDataType } from '../../../types/CardCarouselDataType';
import mainHotImg1 from '../../images/main_hot_1.jpeg';
import mainHotImg2 from '../../images/main_hot_2.jpeg';
import mainHotImg3 from '../../images/main_hot_3.jpeg';
import mainHotImg4 from '../../images/main_hot_4.jpeg';
const cardData: CardDataType[] = [
  {
    imgUrl: mainHotImg1,
    place: '창경궁',
    addr: '서울 종로구',
    info: '그 시절부터 우리가 사랑한 서울의 다섯 궁궐',
  },
  {
    imgUrl: mainHotImg2,
    place: '영도 청학배수지 전망대',
    addr: '부산 영도구',
    info: '아름다운 부산의 야경을 감상할 수 있는 명소',
  },
  {
    imgUrl: mainHotImg3,
    place: '이사부크루즈',
    addr: '전남 여수시',
    info: '아름다운 여수 밤바다를 관광하는 특별한 방법',
  },
  {
    imgUrl: mainHotImg4,
    place: '식장산 문화공원',
    addr: '대전 동구',
    info: '새해 해맞이 행사로 유명한 대표적인 관광명소',
  },
];

export default cardData;
