import React, { useRef, useEffect } from "react";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";

const { lerp } = MathUtils;

function AccelerateAudio({ velocity }) {
  const ref = useRef();
  const maxSpeed = 10;

  const getVolume = () => (2 * velocity) / maxSpeed;

  useFrame(() => {
    if (velocity < maxSpeed) {
      ref.current.setVolume(getVolume());
      ref.current.setPlaybackRate(
        lerp(ref.current.playbackRate, velocity / 2, 0.01)
      );
    }
  });

  useEffect(() => {
    if (ref.current && !ref.current.isPlaying) {
      ref.current.setVolume(getVolume());
      ref.current.play();
    }

    return () => {
      if (ref.current && ref.current.isPlaying) ref.current.stop();
    };
  }, []);

  return (
    <PositionalAudio
      autoplay
      ref={ref}
      url="/sounds/accelerate.mp3"
      loop
      distance={5}
    />
  );
}

export default AccelerateAudio;
