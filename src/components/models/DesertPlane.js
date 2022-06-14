import { useHeightfield } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Float32BufferAttribute } from "three";
import { HEIGHT } from "../../constants";
import { COLOR } from "../../constants/style";

function generateHeightmap({ width, height, number, scale }) {
  const data = [];
  const seedPoints = [];

  for (let i = 0; i < number; i++) {
    seedPoints.push([Math.random(), Math.random()]);
  }

  let max = 0;

  for (let i = 0; i < width; i++) {
    const row = [];
    for (let j = 0; j < height; j++) {
      let min = Infinity;
      seedPoints.forEach((p) => {
        const distance2 = (p[0] - i / width) ** 2 + (p[1] - j / height) ** 2;
        if (distance2 < min) {
          min = distance2;
        }
      });
      const d = Math.sqrt(min);
      if (d > max) {
        max = d;
      }
      row.push(d);
    }
    data.push(row);
  }

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      data[i][j] *= scale / max;
    }
  }
  return data;
}

function HeightmapGeometry({ elementSize, heights }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const dx = elementSize;
    const dy = elementSize;

    const vertices = heights.flatMap((row, i) =>
      row.flatMap((z, j) => [i * dx, j * dy, z])
    );
    const indices = [];

    for (let i = 0; i < heights.length - 1; i++) {
      for (let j = 0; j < heights[i].length - 1; j++) {
        const stride = heights[i].length;
        const index = i * stride + j;

        indices.push(index + 1, index + stride, index + stride + 1);
        indices.push(index + stride, index + 1, index);
      }
    }

    ref.current.setIndex(indices);
    ref.current.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3)
    );
    ref.current.computeVertexNormals();
    ref.current.computeBoundingBox();
    ref.current.computeBoundingSphere();
  }, [heights]);

  return <bufferGeometry ref={ref} />;
}

const heights = HEIGHT.DEFAULT;

function DesertPlane({ elementSize, position, rotation }) {
  const [ref] = useHeightfield(() => ({
    args: [
      heights,
      {
        elementSize,
      },
    ],
    position,
    rotation,
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <meshPhongMaterial color={COLOR.BACKGROUND_COLOR} />
      <HeightmapGeometry heights={heights} elementSize={elementSize} />
    </mesh>
  );
}

export default DesertPlane;
