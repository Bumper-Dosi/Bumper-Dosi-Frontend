import RedayTrigger from "./ReadyTrigger";
import ParkingZone from "./ParkingZone";
import { useState, useEffect } from "react";
import CancelTrigger from "./CancelTrigger";
import history from "../../history";

function GameRoom({ position }) {
  const [isReady, setIsReady] = useState(false);
  const afterPosition = [position[0], position[1], position[2] + 4];

  useEffect(() => {
    if (!isReady) return;

    history.push("gameroom1");
  }, [isReady]);

  return (
    <>
      {!isReady ? (
        <RedayTrigger
          onCollide={(e) => {
            setTimeout(() => {
              setIsReady(true);
            }, 1000);
          }}
          position={position}
          size={[7, 5, 7]}
        />
      ) : (
        <CancelTrigger
          onCollide={(e) => {
            setTimeout(() => {
              setIsReady(false);
            }, 1000);
          }}
          position={afterPosition}
          size={[7, 5, 1]}
        />
      )}
      <ParkingZone
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        userData={{ id: "parking" }}
        isReady={isReady}
        setIsReady={setIsReady}
      />
    </>
  );
}

export default GameRoom;
