import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCAL_STORAGE = 'videoplayer-current-time';
const currentTime = localStorage.getItem(LOCAL_STORAGE);

// console.log(player);

// Зберігаю час відтворення у локальне сховище
const onPlay = function (data) {
  localStorage.setItem(LOCAL_STORAGE, data.seconds);
  // console.log('Збережений час відтворення у локальному сховищі', data.seconds);
};

// Відновлюю час відтворення зі збереженої позиції з локального сховища
player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
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

player.on('timeupdate', throttle(onPlay, 1000));
