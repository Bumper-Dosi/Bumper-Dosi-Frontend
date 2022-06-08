import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { CameraHelper } from "three";

function useShadowHelper(ref) {
  let help;
  const helper = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    let help;

    if (!ref.current) return;
    helper.current = new CameraHelper(
      (help = ref.current) === null || help === void 0
        ? void 0
        : help.shadow.camera
    );

    if (helper.current) {
      scene.add(helper.current);
    }

    return () => {
      if (helper.current) {
        scene.remove(helper.current);
      }
    };
  }, [
    (help = helper.current) === null || help === void 0 ? void 0 : help.uuid,
    ref.current,
  ]);

  useFrame(() => {
    let help;

    if (
      (help = helper.current) === null || help === void 0 ? void 0 : help.update
    ) {
      helper.current.update();
    }
  });
}

export default useShadowHelper;
