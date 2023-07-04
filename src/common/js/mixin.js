import {mapActions, mapGetters, mapMutations} from 'vuex';
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
    ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode', 'favoriteList']),
  },
  methods: {
    ...mapMutations({
      setCurrentSongIndex: SET_CURRENT_INDEX,
      setPlayMode: SET_PLAY_MODE,
      setPlayList: SET_SEQUENCE_LIST
    }),
    ...mapActions(['saveFavoriteList', 'deleteFavoriteList']),
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
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite';
      }
      return 'icon-not-favorite';
    },
    toggleFavorite(song) {
      console.log('toggleFavorite', song);
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    isFavorite(song) {
      const idx = this.favoriteList.findIndex((item) => item.id === song.id);
      return idx > -1;
    }
  }
};

export const searchMiXin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    };
  },
  computed: {
    ...mapGetters(['searchHistory']),
  },
  methods: {

    ...mapActions(['saveSearchHistory', 'deleteSearchHistory']),
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    onQueryChange(query) {
      this.query = query;
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
  }
};
