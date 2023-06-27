import { returnData } from "./recommend";
import jsonp from "../common/js/jsonp";
import Jay_Zhou from "./mock/Jay_Zhou";
import wubai from "./mock/wubai";

export const getSingerList = () => {
  const fakeData = [
    {
      Findex: "A",
      Fother_name: "Joker",
      Fsinger_id: "5062",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000002J4UUk29y8BY.jpg?max_age=2592000",
      Fsinger_name: "薛之谦",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "A",
      Fother_name: "Jay Chou",
      Fsinger_id: "4558",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000",
      Fsinger_name: "周杰伦",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "B",
      Fother_name: "Wang",
      Fsinger_id: "4551",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000001z2JmX09LLgL.jpg?max_age=2592000",
      Fsinger_name: "汪苏泷",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "C",
      Fother_name: "Chen",
      Fsinger_id: "4550",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "陈奕迅",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "C",
      Fother_name: "Chen",
      Fsinger_id: "45501",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "陈奕迅1",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "C",
      Fother_name: "Chen",
      Fsinger_id: "455012",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "陈奕迅12",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "F",
      Fother_name: "Chen",
      Fsinger_id: "45505",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "李宇春",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "F",
      Fother_name: "Chen",
      Fsinger_id: "455012",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "李宇春2",
      Fsinger_tag: "541.555",
    },
    {
      Findex: "F",
      Fother_name: "Chen",
      Fsinger_id: "4550123",
      Fsinger_mid:
        "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
      Fsinger_name: "李宇春3",
      Fsinger_tag: "541.555",
    },
  ];
  return returnData(fakeData);
};

export const getSingerDetail = (id) => {
  return returnData(Jay_Zhou);
};

export const getLyricData = () => returnData(wubai);
