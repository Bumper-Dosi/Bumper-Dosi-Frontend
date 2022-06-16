import { useState, useEffect } from "react";

function BGMPlayer({ url = "/sounds/335. 브금의 숲.mp3", isMute }) {
  const [audio] = useState(new Audio(url));

  useEffect(() => {
    if (!isMute) {
      audio.play();
      audio.volume = 1;
    } else {
      audio.pause();
    }
  }, [isMute]);

  useEffect(() => {
    audio.pause();

    return () => {
      audio.pause();
    };
  }, []);
}

export default BGMPlayer;
