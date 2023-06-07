<script type="text/ecmascript-6">
import {mapMutations} from 'vuex';
import {SET_SINGER} from '../../store/mutations-types';
import {getSingerList} from '../../api/singer';
import {ERR_OK} from '../../api/config';
import Listview from '../../base/listview/index.vue';

const HOT_NAME = "热门"
const HOT_MAXLENGTH = 10
export default {
  components: {
    Listview
  },
  data() {
    return {
      singerList: []
    }
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.status === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data);
        }
      })
    },
    _normalizeSinger(list) {
      let mapObj = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
          if (index < HOT_MAXLENGTH) {
            mapObj.hot.items.push({
              id: item.Fsinger_id,
              name: item.Fsinger_name,
              avatar: item.Fsinger_mid
            });
          }

          const key = item.Findex
          if (!mapObj[key]) {
            mapObj[key] = {
              title: key,
              items: []
            }
          }

          mapObj[key].items.push({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            avatar: item.Fsinger_mid
          })
      })

      const hot = []
      const ret = []

      for(let key in mapObj) {
        let val = mapObj[key]
        if (val.title.match(/[a-zA-Z]/g)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    },
    selectSinger(singer) {
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    ...mapMutations({
      setSinger: SET_SINGER
    })
  },
  created() {
    this._getSingerList();
  },
}
</script>

<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singerList"></listview>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
singer
  position: fixed
  top:88px
  bottom:0
  width: 100%
</style>
