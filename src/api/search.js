import hotkey from './mock/hotkey';
import searchResult from './mock/searchResult';
import {returnData} from './recommend';

export const getHotKey = () => returnData(hotkey);

export const search = () => {
  return returnData(searchResult);
};
