import React, { useState, useEffect } from "react";
import { usePlane } from "@react-three/cannon";

import ReadyTrigger from "../models/ReadyTrigger";
import CancelTrigger from "../models/CancelTrigger";
import { useRef } from "react";

function ParkingZone({
  size,
  position,
  startGameFn,
  user,
  readyUsers,
  setReadyUsers,
  setIsUsersReady,
  ...props
}) {
  const [isReady, setIsReady] = useState(false);
  const [ref, api] = usePlane(() => ({
    type: "Static",
    material: "ground",
    mass: 0,
    position,
    ...props,
  }));
  const afterPosition = [position[0], position[1], position[2] + 4];
  const readyRef = useRef();

  useEffect(() => {
    const readyId = setTimeout(() => {
      readyUsers.includes(user) &&
        readyRef.current &&
        api.position.set(position[0], position[1] + 2, position[2]);
      setTimeout(() => {
        setIsReady(false);
        readyUsers.includes(user) && startGameFn();
      }, 2000);
    }, 6000);

    !isReady && clearInterval(readyId);
  }, [isReady]);

  return (
    <>
      {!isReady ? (
        <ReadyTrigger
          onCollideBegin={(e) => {
            const readyUser = e.body.parent.userData.id;
            setReadyUsers((users) => [...users, readyUser]);
          }}
          onCollide={(e) => {
            setIsUsersReady(true);
            setTimeout(() => {
              setIsReady(true);
              readyRef.current = true;
            }, 700);
          }}
          position={position}
          size={[7, 5, 7]}
        />
      ) : (
        <CancelTrigger
          onCollideBegin={(e) => {
            const cancelUser = e.body.parent.userData.id;
            setReadyUsers((users) => {
              const index = users.indexOf(cancelUser);

              users.splice(index, 1);

              return users;
            });
          }}
          onCollide={(e) => {
            setIsUsersReady(false);
            setTimeout(() => {
              setIsReady(false);
              readyRef.current = false;
            }, 700);
          }}
          position={afterPosition}
          size={[7, 5, 1]}
        />
      )}
      <group ref={ref}>
        <mesh>
          <planeGeometry args={[7, 7]} />
          <meshPhysicalMaterial color={!isReady ? "yellow" : "red"} />
        </mesh>
        <mesh>
          <boxGeometry args={[7 * 0.7, 7 * 0.7]} />
          <meshPhysicalMaterial color="black" />
        </mesh>
      </group>
    </>
  );
}

export default ParkingZone;
