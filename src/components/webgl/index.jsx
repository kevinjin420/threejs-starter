import { Float } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '../../hooks/use-scroll'
import { useMemo, useRef, useState, Suspense } from 'react'

function SimpleObjects() {
    const { viewport } = useThree()
    const [scrollPos, setScrollPos] = useState(0)

    useScroll(({ scroll }) => {
        setScrollPos(scroll)
    })
    
    // Create objects that span roughly 5 screen heights
    const objects = useMemo(() => {
        return new Array(15).fill(0).map((_, i) => ({
            // Random X within viewport width
            x: (Math.random() - 0.5) * viewport.width,
            // Spread Y: Start at top, go down. 
            // We subtract scrollPos later to move them "up" as we scroll down, or we can fix them in space and move camera.
            // Here: Fixed positions in world space.
            y: -i * (viewport.height * 0.5) + (viewport.height * 0.5), 
            z: (Math.random() - 0.5) * 5,
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: 0.5 + Math.random() * 1.5,
            color: Math.random() > 0.5 ? '#ff6b6b' : '#4ecdc4'
        }))
    }, [viewport])

    return (
        <group>
            {objects.map((obj, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh 
                        position={[
                            obj.x, 
                            obj.y + (scrollPos * 0.02), // Parallax: move slightly with scroll
                            obj.z
                        ]} 
                        rotation={obj.rotation} 
                        scale={obj.scale}
                    >
                        <boxGeometry args={[1, 1, 1]} />
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

export function WebGL() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 15], fov: 50 }} // Perspective Camera
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                <Content />
            </Suspense>
        </Canvas>
    </div>
  )
}
