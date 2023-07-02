import {getLyricData} from '../../api/singer';
import {ERR_OK} from '../../api/config';

export default class Song {
  constructor({id, mid, singer_name, title, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer_name = singer_name;
    this.title = title;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }

    return new Promise((resolve, reject) => {
      getLyricData().then((res) => {
        if (res.status === ERR_OK) {
          this.lyric = res.data;
          resolve(this.lyric);
        } else {
          reject('no lyric');
        }
      });
    });
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.vid,
    album: musicData.title || musicData.albumname,
    singer_name: filterSinger(musicData.singer),
    title: musicData.title || musicData.songname,
    duration: musicData.duration || 180,
    image: musicData.pic,
    url:
      musicData.url ||
      `https://audio04.dmhmusic.com/71_53_T10063772536_128_4_1_0_sdk-cpm/cn/0513/M00/53/54/ChAKCGRlvZWAKsczAEbXssLcbIY790.mp3?xcode=b414a30c3f5438cac16312d8936e88b5ef7a66a`,
  });
}

export function filterSinger(singer) {
  console.log(singer);
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
}
