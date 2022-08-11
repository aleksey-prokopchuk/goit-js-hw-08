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
if (currentTime) {
  player.setCurrentTime(currentTime);
}

player.on('timeupdate', throttle(onPlay, 1000));
