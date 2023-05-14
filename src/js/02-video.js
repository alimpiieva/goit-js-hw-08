import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const saveCurrentTime = () => {
  player.getCurrentTime(function(time) {
    localStorage.setItem('videoplayer-current-time', time);
  });
};
 
const setCurrentTimeFromStorage = () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime))
  }
};

player.on('timeupdate', throttle(saveCurrentTime, 1000));

setCurrentTimeFromStorage();