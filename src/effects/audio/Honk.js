import { useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";

import { useControls } from "../../hooks/useControls";

function HonkAudio() {
  const honkRef = useRef();
  const controls = useControls();
  const { honk } = controls.current;

  useEffect(() => {
    if (honkRef.current) {
      if (honk && !honkRef.current.isPlaying) {
        honkRef.current.setVolume(3);
        honkRef.current.play();
      }

      if (!honk && honkRef.current.isPlaying) {
        honkRef.current.stop();
      }
    }
  }, [honk]);

  return <PositionalAudio ref={honkRef} url="/sounds/honk.mp3" distance={8} />;
}

export default HonkAudio;
