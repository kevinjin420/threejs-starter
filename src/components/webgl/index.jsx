import { Float } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '../../hooks/use-scroll'
import { useMemo, useRef, useState, Suspense } from 'react'

function StarField() {
    const { viewport, size } = useThree()
    const pointsRef = useRef()
    const scrollRef = useRef(0)
  
    useScroll(({ scroll }) => {
      scrollRef.current = scroll
    })
  
    const count = 2000
    // Pixel to Three.js unit conversion factor
    const pixelToThree = viewport.height / size.height

    const positions = useMemo(() => {
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2 // Wide X spread
        // Spread Y from top of screen down to 6 screens below
        // viewport.height * 0.5 is top. 
        // -viewport.height * 5.5 is bottom.
        // Random distribution in that range.
        const totalHeight = viewport.height * 6
        positions[i * 3 + 1] = (viewport.height * 0.5) - (Math.random() * totalHeight)
        
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10 // Depth spread
      }
      return positions
    }, [viewport])
  
    useFrame(() => {
      if (pointsRef.current) {
          // Move stars up as we scroll down. 
          // Multiply by pixelToThree to match scroll speed 1:1, 
          // then multiply by 0.5 for a "distant background" parallax feel.
          pointsRef.current.position.y = scrollRef.current * pixelToThree * 0.5
      }
    })
  
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="white" sizeAttenuation transparent opacity={0.8} />
      </points>
    )
  }

function SimpleObjects() {
    const { viewport, size } = useThree()
    const [scrollPos, setScrollPos] = useState(0)

    useScroll(({ scroll }) => {
        setScrollPos(scroll)
    })
    
    const pixelToThree = viewport.height / size.height

    const objects = useMemo(() => {
        return new Array(30).fill(0).map((_, i) => ({
            x: (Math.random() - 0.5) * viewport.width,
            // Distribute objects evenly from top to bottom across 5 sections
            y: (viewport.height * 0.5) - (i * (viewport.height * 5) / 30) - (Math.random() * 2),
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
                            obj.y + (scrollPos * pixelToThree * 0.8), // Move slightly slower than 1:1 for depth
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
        <StarField />
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
