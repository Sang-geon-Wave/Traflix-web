import { SummarySetDataType } from '../../../types/SummarySetDataType';

const SummaryTestData: SummarySetDataType[] = [
  {
    date: '20230914',
    summaryData: [
      { place: '서울', time: '11:00', tag: '출발' },
      { place: '익산', time: '15:00', tag: '경유' },
      { place: '여수EXPO', time: '18:00', tag: '도착' },
    ],
  },
  {
    date: '20230915',
    summaryData: [
      { place: '여수EXPO', time: '18:00', tag: '출발' },
      { place: '익산', time: '15:00', tag: '경유' },
      { place: '서울', time: '11:00', tag: '도착' },
    ],
  },
];

export default SummaryTestData;
