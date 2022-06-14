import { useEffect, useRef } from "react";

export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true);
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false);
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
}

export function useKeyDown(target, event) {
  useEffect(() => {
    // const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true);
    // const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false);
    // window.addEventListener("keypress", pressedHandler);
    // window.addEventListener("keyup", upHandler);
    // const keyPressedHandler = ({ key }) => target.indexOf(key) !== -1

    return () => {
      // window.removeEventListener("keypress", pressedHandler);
      // window.removeEventListener("keyup", upHandler);
    };
  }, []);
}

export function useControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
    boost: false,
    reset: false,
    honk: false,
    mute: false,
  });
  useKeyPress(["ArrowUp", "w"], (pressed) => (keys.current.forward = pressed));
  useKeyPress(
    ["ArrowDown", "s"],
    (pressed) => (keys.current.backward = pressed)
  );
  useKeyPress(["ArrowLeft", "a"], (pressed) => (keys.current.left = pressed));
  useKeyPress(["ArrowRight", "d"], (pressed) => (keys.current.right = pressed));
  useKeyPress([" "], (pressed) => (keys.current.brake = pressed));
  useKeyPress(["r"], (pressed) => (keys.current.reset = pressed));
  useKeyPress(["b"], (pressed) => (keys.current.boost = pressed));
  useKeyPress(["h"], (pressed) => (keys.current.honk = pressed));
  // useKeyDown(["m"], (pressed) => (keys.current.mute = pressed));

  return keys;
}
