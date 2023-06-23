<script type="text/ecmascript-6">
import MusicList from '../music-list/music-list.vue';
import {mapGetters} from 'vuex';
import { getSongList } from '../../api/recommend'
import { ERR_OK } from '../../api/config';
import {createSong} from '../../common/js/song';

export default {
  components: {MusicList},
  data() {
    return {
      songs: []
    }
  },
  computed: {
    bgImage() {
      return this.disc.imgurl
    },
    title() {
      return this.disc.dissname
    },
    ...mapGetters(['disc'])
  },
  created() {
    console.log("created",this.disc);
    this._getSongList();
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend');
        return;
      }
      getSongList().then(res => {
        console.log(res);
        if (res.status === ERR_OK) {
          this.songs = this._normalizedSongs(res.data.data.list)
        }
      })
    },
    _normalizedSongs(list) {
      const ret = [];
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret;
    }
  }
};
</script>

<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all .3s

    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0 ,0)
</style>
