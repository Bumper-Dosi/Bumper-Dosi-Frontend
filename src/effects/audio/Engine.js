import React, { useRef, useEffect, useState } from "react";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";

const { lerp } = MathUtils;

function EngineAudio({ velocity }) {
  const engineAudioRef = useRef();
  const maxSpeed = 10;

  useFrame(() => {
    if (velocity && velocity < maxSpeed) {
      engineAudioRef.current.setVolume(6);
      engineAudioRef.current.setPlaybackRate(
        lerp(engineAudioRef.current.playbackRate, velocity / 3.5 + 0.5, 0.2)
      );
    }
  });

  useEffect(() => {
    if (engineAudioRef.current && !engineAudioRef.current.isPlaying) {
      engineAudioRef.current.setVolume(6);
      engineAudioRef.current.play();
    }

    return () => {
      if (engineAudioRef.current && engineAudioRef.current.isPlaying)
        engineAudioRef.current.stop();
    };
  }, []);

  return (
    <PositionalAudio
      autoplay
      ref={engineAudioRef}
      url="/sounds/engine.mp3"
      loop
      distance={4}
    />
  );
}

export default EngineAudio;
