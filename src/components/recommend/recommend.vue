<script type="text/ecmascript-6">
import Slider from '../../base/slider/slider.vue';
import { getRecommend, getDiscList } from "../../api/recommend";
import { ERR_OK } from "../../api/config"
import { Loading } from 'element-ui';
import scroll from '../../base/scroll/index.vue';
import { playListMixin} from '../../common/js/mixin';
import loading from '../../base/loading/loading.vue';
import {mapMutations} from 'vuex';
import {SET_DISC} from '../../store/mutations-types'

export default {
  mixins: [playListMixin],
  components: {Slider, scroll, loading},
  data() {
    return {
      recommends: [],
      discLists: []
    }
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  mounted() {
    console.log("Mounted", this.recommends)
  },
  methods: {
    loadingHandle() {
      this.loadInstance = Loading.service({
        lock: true,
        text: "努力加载中……",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector(".recommend-list")
      });
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.status === ERR_OK) {
          this.recommends = res.data;
        }
      })
    },
    _getDiscList() {
      this.loadingHandle();
      setTimeout(() => {
        getDiscList().then(res => {
          this.loadInstance.close();
          if (res.status === ERR_OK) {
            this.discLists = res.data;
          }
        })
      },2000)
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length  > 0 ? '60px' : 0;
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectItem(item) {
      console.log(item);
      this.$router.push(({
        path: `/recommend/${item.dissid}`
      }));
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: SET_DISC
    }),
    _loadList() {
      // this.discLists = this.discLists.concat(this.discLists)
    }
  }
}
</script>

<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discLists">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in discLists"
              :key="item.qq"
              class="item infinite-list-item"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" :src="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!discLists.length">
          <loading />
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
