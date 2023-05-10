import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const saveCurrentTime = () => {
  player.getCurrentTime().then((time) => {
    localStorage.setItem('videoplayer-current-time', time);
  }).catch((error) => {
    console.error('Error getting current time:', error);
  });
};

const setCurrentTimeFromStorage = () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime)).catch((error) => {
      console.error('Error setting current time:', error);
    });
  }
};

player.on('timeupdate', throttle(saveCurrentTime, 1000));

setCurrentTimeFromStorage();