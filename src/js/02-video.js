import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const refs = { iframe: document.querySelector('#vimeo-player') };
const VIDEO_STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(refs.iframe);

const onPlay = function (data) {
  localStorage.setItem(VIDEO_STORAGE_KEY, data.seconds); //записываем данные в хранилище
  //   console.log(localStorage.getItem('videoplayer-current-time')); // проверка лодаша ) все гуд
};

const optimizedOnPlay = throttle(onPlay, 1000);
player.on('timeupdate', optimizedOnPlay);
// гайд который мне помог https://habr.com/ru/post/647359/

const setTime = localStorage.getItem(VIDEO_STORAGE_KEY);
if (setTime) {
  //правка касаемо записаного времени
  player
    .setCurrentTime(setTime)
    .then(function (seconds) {
      // получаем данные с хранилища
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
