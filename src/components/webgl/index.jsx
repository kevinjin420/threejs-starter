import { Float } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useFrame as useRaf } from '@darkroom.engineering/hamo'
import { useScroll } from '../../hooks/use-scroll'
import { useStore } from '../../lib/store'
import { mapRange } from '../../lib/maths'
import { Suspense, useMemo, useRef, useState } from 'react'
import { MathUtils, Vector3 } from 'three'

function Raf({ render = true }) {
  const { advance } = useThree()

  useRaf((time) => {
    if (render) {
      advance(time / 1000)
    }
  })
}

function SimpleObjects() {
    const groupRef = useRef()
    const { viewport } = useThree()
    const [scrollPos, setScrollPos] = useState(0)

    useScroll(({ scroll }) => {
        setScrollPos(scroll)
    })
    
    const objects = useMemo(() => {
        return new Array(10).fill(0).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * viewport.width,
                -i * (viewport.height * 0.8), // Spread vertically
                (Math.random() - 0.5) * 5
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: 0.5 + Math.random() * 1.5,
            color: Math.random() > 0.5 ? '#ff6b6b' : '#4ecdc4'
        }))
    }, [viewport])

    return (
        <group ref={groupRef} position={[0, viewport.height / 2, 0]}>
            {objects.map((obj, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh 
                        position={[
                            obj.position[0], 
                            obj.position[1] + (scrollPos * 0.05), // Simple parallax
                            obj.position[2]
                        ]} 
                        rotation={obj.rotation} 
                        scale={obj.scale}
                    >
                        <boxGeometry />
                        <meshStandardMaterial color={obj.color} />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}


function Content() {
  return (
    <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SimpleObjects />
    </>
  )
}

export function WebGL({ render = true }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas
        gl={{
            powerPreference: 'high-performance',
            antialias: true,
            alpha: true,
        }}
        dpr={[1, 2]}
        frameloop="never"
        orthographic
        camera={{ near: 0.01, far: 10000, position: [0, 0, 1000], zoom: 100 }}
        >
        <Raf render={render} />
        <Suspense fallback={null}>
            <Content />
        </Suspense>
        </Canvas>
    </div>
  )
}
