<template>
  <transition name="slide">
    <music-list :rank="true" :title="title" :bg-image="bgImage" :songs="musicList"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import MusicList from '../music-list/music-list.vue'
import {mapGetters} from 'vuex';
import {getMusicList} from '../../api/rank'
import {ERR_OK} from '../../api/config';
import {createSong} from '../../common/js/song';
export default {
  components: {
    MusicList
  },
  data() {
    return {
      musicList: []
    }
  },
  computed: {
    ...mapGetters(['topList']),
    title() {
      return this.topList.toptitle
    },
    bgImage() {
      if (this.musicList.length) {
        return this.musicList[0].image
      }
      return this.topList.picurl
    }
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        return this.$router.push('/rank');
      }
      getMusicList().then(res => {
        if (res.data.code === ERR_OK) {
          this.musicList = this._normalizedSong(res.data.data.list);
        }
      })
    },
    _normalizedSong(list) {
      let ret = [];
      list.forEach((item, idx) => {
        ret.push(createSong(item))
      })
      return ret;
    }
  },
  created() {
    this._getMusicList();
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylLus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>

