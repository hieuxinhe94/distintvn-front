// @ts-nocheck
"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
} from "@react-three/drei"
import { easing } from "maath"
import { useSnapshot } from "valtio"
import { state } from "./store"

const CustomProduct = () => {
  //@ts-ignore
  const config = { position: [0, 0, 0.5], fov: 35 }
  useGLTF.preload("/shirt_baked_collapsed.glb")
  ;["/react.png", "/three2.png", "/pmndrs.png"].forEach(useTexture.preload)

  return (
    <div className="bg-indigo-800/90 w-full py-24">
      <div className="content-container text-gray-200 flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          <p className="text-2xl-semi w-96">Thể hiện cá tính riêng của mình?</p>
          <div className="mt-6 w-64">
            <UnderlineLink href="/store">Đi tới studio </UnderlineLink>
          </div>
          <hr className="text-base-regular  mt-12 mx-1" />
          {/* <span className="text-base-regular text-gray-600 mt-12 mx-1">
            Đề xuất chiếc áo thun in hình gia đình, người bạn yêu thương
          </span> */}
          <p className="text-sm w-96 pt-2 mx-1">Màu sắc</p>
          <div className="flex justify-start pt-2 ">
            <div className="rounded-full w-8 h-8 bg-indigo-800 mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-purple-800 mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-green-800 mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-amber-800 mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-yellow-200 mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-white mr-2 cursor-pointer"></div>
            <div className="rounded-full w-8 h-8 bg-black mr-2 cursor-pointer"></div>
          </div>

          <p className="text-sm w-96 pt-2 mx-1">Loại sản phẩm</p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 text-sm pt-2">
            <button className="border-white border text-xsmall-regular h-[50px] px-4 transition-all duration-200">
              Áo thun
            </button>
            <button className="border-white border text-xsmall-regular h-[50px] transition-all duration-200">
              Polo
            </button>
            <button className="border-white border text-xsmall-regular h-[50px] transition-all duration-200">
              Jean
            </button>
            <button className="border-white border text-xsmall-regular h-[50px] transition-all duration-200">
              Váy
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
          <Canvas
            shadows
            camera={{ position: [0, 0, 0.5], fov: 35}}
            gl={{ preserveDrawingBuffer: true }}
            /* @ts-ignore */
           
            eventPrefix="client"
          >
            <ambientLight intensity={0.5} />
            <Environment files="/potsdamer_platz_1k.hdr" />
             <CameraRig>
              <Backdrop />
              <Center>
                <Shirt />
              </Center>
            </CameraRig>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.color,
      0.25,
      delta
    )
  )
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    )
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/${snap.decal}.png`)
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb")
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  )
  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      <Decal
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  )
}

export default CustomProduct
