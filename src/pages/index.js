import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Calculator from "@/components/Calculator"
import { Perf } from "r3f-perf"

export default function Home() {
  return (
    <>
      <div className = 'canvas'>
        <Canvas camera = { { position: [3, 3, 3], fov: 75 } }>
          <OrbitControls />
          <axesHelper args = {[50, 50]}/>
          <gridHelper args = {[50, 50]} />
          <Perf />
          <Calculator />
        </Canvas>
      </div>
    </>
  )
}
