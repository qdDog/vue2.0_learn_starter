import Eson from "./mock/Eson";

export const getRecommend = () => {
  const fakeData = [
    {
      linkUrl: "baidu.com",
      picUrl:
        "https://cdn.pixabay.com/photo/2023/03/31/13/01/dolphin-7889945_1280.jpg",
    },
    {
      linkUrl: "baidu.com",
      picUrl:
        "https://cdn.pixabay.com/photo/2023/05/29/14/05/mountains-8026175_1280.jpg",
    },
    {
      linkUrl: "baidu.com",
      picUrl:
        "https://cdn.pixabay.com/photo/2023/04/26/15/51/lighthouse-7952696_1280.jpg",
    },
    {
      linkUrl: "baidu.com",
      picUrl:
        "https://cdn.pixabay.com/photo/2020/02/07/21/12/everest-4828404_1280.png",
    },
  ];
  return returnData(fakeData);
};

export const returnData = (data) =>
  new Promise((resolve, reject) => {
    resolve({ status: 0, data: data });
    reject({ status: 1, data: {} });
  });

export const getDiscList = () => {
  const fakeData = [
    {
      commit_time: "2017-05-03",
      createtime: "2017-05-03",
      creator: "古风圈",
      avatarUrl: "",
      followflag: 0,
      isVip: 0,
      name: "古风圈里没有我",
      qq: 3308359265,
      singerid: 0,
      singermid: 1,
      type: 0,
      dissid: "2341968379",
      dissname: "五四青年节:富强、民主、文明、和谐",
      imgurl:
        "https://cdn.pixabay.com/photo/2023/03/31/13/01/dolphin-7889945_1280.jpg",
      introduction:
        '五四青年节源于中国1919年反帝爱国的"五四运动",五四爱国运动是一次们底的反对催国',
      listennup: 116298,
      score: 0,
      version: 0,
    },
  ];

  for (let i = 0; i < 15; i++) {
    fakeData[0].qq++;
    fakeData.push(fakeData[0]);
  }

  return returnData(fakeData);
};

export function getSongList() {
  return returnData(Eson);
}
