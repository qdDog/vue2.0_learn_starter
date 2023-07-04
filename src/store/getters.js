import state from './state';
import {playMode} from '../common/js/config';

// 歌手
export const singer = (state, getters) => state.singer;

/********* 播放器 start *********/
// 播放状态
export const playing = (state) => state.playing;

// 全屏
export const fullScreen = (state) => state.fullScreen;

// 播放列表
export const playList = (state) => state.playList;

//
export const sequenceList = (state) => state.sequenceList;

// 播放模式
export const mode = (state) => state.mode;

//
export const currentIndex = (state) => state.currentIndex;

//
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
};
/********* 播放器 end *********/

export const disc = (state) => state.disc;

export const topList = (state) => state.topList;

export const searchHistory = (state) => state.searchHistory;

export const playHistory = (state) => state.playHistory;

export const favoriteList = (state) => state.favoriteList;
