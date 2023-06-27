import { mapGetters } from "vuex";
import { playList } from "../../store/getters";

export const playListMixin = {
  computed: {
    ...mapGetters(["playList"]),
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
      throw new Error("component must implement handlePlaylist method");
    },
  },
};
