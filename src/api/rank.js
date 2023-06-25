import {returnData} from './recommend';
import topList from './mock/topList';
import Joker_Xue from './mock/Joker_Xue';
export const getTopList = () => new Promise((resolve, reject) => {
  resolve(topList)
});

export const getMusicList = () => returnData(Joker_Xue)
