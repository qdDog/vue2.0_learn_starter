<script type="text/ecmascript-6">
import {search} from '../../api/search';
import {createSong, filterSinger} from '../../common/js/song';
import Scroll from '../../base/scroll/index.vue';
import Loading from '../../base/loading/loading.vue';
import Singer from '../../common/js/singer';
import {mapMutations, mapActions} from 'vuex';
import {SET_SINGER} from '../../store/mutations-types';
import NoResult from '../../base/no-result/no-result.vue';
import {before} from 'better-scroll/src/util';

const TYPE_SINGER = 'singer';
export default {
  components: {Scroll, Loading, NoResult},
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    query() {
      this._search();
    }
  },
  methods: {
    ...mapMutations({
      setSinger: SET_SINGER
    }),
    ...mapActions(['insertSong']),
    _search() {
      this.hasMore = true;
      search(this.query, this.page, this.showSinger).then(res => {
        this.result = this._genResult(res.data.data);
        console.log(this.result);
        // this._checkMore(res.data.data);
      });
    },
    _checkMore(data) {
      const song = data.song;
      if (!song.list.length || (song.curnum + song.curpage * 20) > 20) {
        this.hasMore = false;
      }
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}});
      }

      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        ret.push(createSong(musicData));
      });
      return ret;
    },

    getIconCls(item) {
      if (item && item.type === TYPE_SINGER) {
        return 'icon-mine';
      } else {
        return 'icon-music';
      }
    },
    getDisplayName(item) {
      console.log('getDisplayName', item);
      if (item && item.type === TYPE_SINGER) {
        return item.singer_name;
      } else if (item) {
        return `${item.title}-${item.singer_name}`;
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      search(this.query, this.page, this.showSinger, 20).then(res => {
        this.result = this.result.concat(this._genResult(res.data.data));
        this._checkMore(res.data.data);
      });
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
      this.$emit('select');
    },
    listScroll() {
      this.$emit('listScroll');
    },
    refresh() {
      this.$refs.suggest.refresh();
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    };
  }
};
</script>

<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    @beforeScroll="listScroll"
    @scrollToEnd="searchMore"
    :beforeScroll="beforeScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.suggest
  height: 100%
  overflow: hidden

  .suggest-list
    padding: 0 30px

    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px

    .icon
      flex: 0 0 30px
      width: 30px

      [class^="icon-"]
        font-size: 14px
        color: $color-text-d

    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden

      .text
        no-wrap()

  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
