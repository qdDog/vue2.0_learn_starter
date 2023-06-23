<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { getSingerDetail } from "../../api/singer";
import {createSong} from '../../common/js/song';
import {ERR_OK} from '../../api/config';
import musicList from '../music-list/music-list.vue';
export default {
  name: "singerDetail",
  components: {
    musicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.data.code === ERR_OK) {
          this.songs = this._normalizedSong(res.data.data.list);
        }
      });
    },
    _normalizedSong(list) {
      let ret = [];
      list.forEach((item, idx) => {
        ret.push(createSong(item))
      })
      return ret;
    }
  }
};
</script>

<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%,0,0)
</style>
