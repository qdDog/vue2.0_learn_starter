import {mapGetters, mapMutations} from 'vuex';
import {playList} from '../../store/getters';
import {playMode} from './config';
import {shuffle} from './util';
import {
  SET_CURRENT_INDEX,
  SET_PLAY_MODE,
  SET_SEQUENCE_LIST
} from '../../store/mutations-types';

export const playListMixin = {
  computed: {
    ...mapGetters(['playList']),
  },
  mounted() {
    this.handlePlaylist(this.playList);
  },
  activated() {
    this.handlePlaylist(this.playList);
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(newVal);
    },
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method');
    },
  },
};


export const playerMiXin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    },
    ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode'])
  },
  methods: {
    ...mapMutations({
      setCurrentSongIndex: SET_CURRENT_INDEX,
      setPlayMode: SET_PLAY_MODE,
      setPlayList: SET_SEQUENCE_LIST
    }),
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => item.id === this.currentSong.id);
      this.setCurrentSongIndex(index);
    },
  }
};
