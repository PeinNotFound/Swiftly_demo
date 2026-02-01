import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, QuadraticBezierLine, Text } from '@react-three/drei';
import * as THREE from 'three';

// Helper to convert lat/long to 3D vector
const getPosition = (lat, long, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
};

// 3D Floating Title Component
const FloatingTitle3D = () => {
    const titleRef = useRef();

    // Individual refs for each question mark for independent animation
    const qRefs = useRef([...Array(12)].map(() => React.createRef()));

    useFrame((state) => {
        // Animate Title - Gentle Sway
        if (titleRef.current) {
            titleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
            titleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }

        // Animate each question mark independently with fade based on position
        qRefs.current.forEach((ref, i) => {
            if (ref.current) {
                const offset = i * 0.7;
                const speedY = 0.3 + (i % 3) * 0.1;
                const speedX = 0.2 + (i % 4) * 0.05;

                // Update position
                ref.current.position.y += Math.sin(state.clock.elapsedTime * speedY + offset) * 0.003;
                ref.current.position.x += Math.cos(state.clock.elapsedTime * speedX + offset) * 0.002;
                ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + offset) * 0.1;

                // Edge-based fade animation
                const x = ref.current.position.x;
                const y = ref.current.position.y;
                const edgeThreshold = 5.5;
                const fadeStart = 4.5;

                // Calculate distance from center
                const distX = Math.abs(x);
                const distY = Math.abs(y);
                const maxDist = Math.max(distX, distY);

                // Fade out when approaching edges
                let opacity = 1;
                if (maxDist > fadeStart) {
                    opacity = Math.max(0, 1 - (maxDist - fadeStart) / (edgeThreshold - fadeStart));
                }

                // Apply opacity to material
                if (ref.current.material) {
                    ref.current.material.opacity = opacity * (ref.current.userData.baseOpacity || 0.3);
                }
            }
        });
    });

    return (
        <>
            <group ref={titleRef} position={[0, 0, 0]}>
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.65}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    Why Choose
                </Text>
                <Text
                    position={[0, -0.4, 0]}
                    fontSize={0.75}
                    color="#fbbf24"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    Our Platform?
                </Text>
            </group>

            {/* Independent Floating Question Marks - More distributed */}
            <Text ref={qRefs.current[0]} position={[4, 1.5, -2]} fontSize={1.5} color="#fbbf24" rotation={[0, -0.2, 0.2]} fillOpacity={0.4} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[1]} position={[-3.8, -1.5, -3]} fontSize={2} color="#6366f1" rotation={[0, 0.3, -0.2]} fillOpacity={0.3} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[2]} position={[2.5, -3, -1]} fontSize={1} color="#ffffff" rotation={[0, -0.1, 0.1]} fillOpacity={0.25} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[3]} position={[-2.5, 2.5, -4]} fontSize={1.2} color="#fbbf24" rotation={[0, 0.4, -0.1]} fillOpacity={0.3} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[4]} position={[5, -1, -5]} fontSize={2.5} color="#4f46e5" rotation={[0, -0.3, 0.3]} fillOpacity={0.2} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[5]} position={[0, 3.5, -6]} fontSize={1.8} color="#ffffff" rotation={[0, 0, 0.1]} fillOpacity={0.15} depthWrite={false} material-toneMapped={false}>?</Text>

            {/* New question marks for more variety */}
            <Text ref={qRefs.current[6]} position={[-5, 0.5, -3]} fontSize={1.6} color="#fbbf24" rotation={[0, 0.2, -0.3]} fillOpacity={0.35} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[7]} position={[3, 3, -4]} fontSize={1.3} color="#6366f1" rotation={[0, -0.4, 0.2]} fillOpacity={0.28} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[8]} position={[-1, -2.5, -2]} fontSize={1.8} color="#4f46e5" rotation={[0, 0.1, -0.15]} fillOpacity={0.32} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[9]} position={[6, 2, -5]} fontSize={1.4} color="#ffffff" rotation={[0, -0.25, 0.25]} fillOpacity={0.22} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[10]} position={[-4, -3, -4]} fontSize={2.2} color="#fbbf24" rotation={[0, 0.35, -0.2]} fillOpacity={0.26} depthWrite={false} material-toneMapped={false}>?</Text>
            <Text ref={qRefs.current[11]} position={[1.5, 4, -3]} fontSize={1.1} color="#6366f1" rotation={[0, -0.15, 0.3]} fillOpacity={0.3} depthWrite={false} material-toneMapped={false}>?</Text>
        </>
    );
};

// New component for individual markers to handle smooth animation
const GlobeMarker = ({ position, isActive, texture }) => {
    const spriteRef = useRef();
    // Target scale: Bigger when active (1.8), smaller when inactive (0.6)
    const targetScale = isActive ? 1.5 : 0.6; // Reduced active size as per user request
    const targetOpacity = isActive ? 1 : 0.6;

    useFrame((state, delta) => {
        if (spriteRef.current) {
            // Smooth lerp for scale
            const currentScale = spriteRef.current.scale.x;
            const speed = 4; // Animation speed
            const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * speed);
            spriteRef.current.scale.set(newScale, newScale, newScale);

            // Smooth lerp for opacity
            spriteRef.current.material.opacity = THREE.MathUtils.lerp(
                spriteRef.current.material.opacity,
                targetOpacity,
                delta * speed
            );
        }
    });

    return (
        <group position={position} renderOrder={10}>
            <sprite ref={spriteRef} renderOrder={11}>
                <spriteMaterial
                    map={texture}
                    transparent
                    opacity={0.6} // Initial value, updated by useFrame
                />
            </sprite>
        </group>
    );
};

const GlobeMesh = ({ onHubChange, isAutoRotating }) => {
    const groupRef = useRef();
    const logoTexture = useLoader(THREE.TextureLoader, '/logo192.png');
    // Using public path as verified in previous steps
    const earthTexture = useLoader(THREE.TextureLoader, '/earth-dark.jpg');
    const [currentHubIndex, setCurrentHubIndex] = useState(0);
    const localTimeRef = useRef(0);

    // 1. Expanded Location List - Reordered for continuous travel path
    const locations = useMemo(() => [
        { id: 1, lat: 40.7128, long: -74.0060, name: 'New York' },
        { id: 2, lat: 51.5074, long: -0.1278, name: 'London' },
        { id: 11, lat: 48.8566, long: 2.3522, name: 'Paris' },
        { id: 18, lat: 52.5200, long: 13.4050, name: 'Berlin' },
        { id: 27, lat: 41.9028, long: 12.4964, name: 'Rome' }, // Europe
        { id: 28, lat: 59.3293, long: 18.0686, name: 'Stockholm' }, // Europe
        { id: 29, lat: 37.9838, long: 23.7275, name: 'Athens' }, // Europe
        { id: 6, lat: 55.7558, long: 37.6173, name: 'Moscow' },
        { id: 21, lat: 55.0084, long: 82.9357, name: 'Novosibirsk' }, // Big Russia
        { id: 22, lat: 62.0355, long: 129.6755, name: 'Yakutsk' }, // Eastern Russia
        { id: 23, lat: 59.5667, long: 150.8000, name: 'Magadan' }, // Far East Russia
        { id: 12, lat: 39.9042, long: 116.4074, name: 'Beijing' },
        { id: 32, lat: 37.5665, long: 126.9780, name: 'Seoul' }, // Asia
        { id: 3, lat: 35.6762, long: 139.6503, name: 'Tokyo' },
        { id: 7, lat: -33.8688, long: 151.2093, name: 'Sydney' },
        { id: 24, lat: -18.1416, long: 178.4419, name: 'Fiji' }, // Pacific
        { id: 25, lat: 21.3069, long: -157.8583, name: 'Honolulu' }, // Pacific
        { id: 9, lat: 1.3521, long: 103.8198, name: 'Singapore' },
        { id: 20, lat: 13.7563, long: 100.5018, name: 'Bangkok' },
        { id: 31, lat: 28.6139, long: 77.2090, name: 'New Delhi' }, // Asia
        { id: 5, lat: 19.0760, long: 72.8777, name: 'Mumbai' },
        { id: 13, lat: 25.2048, long: 55.2708, name: 'Dubai' },
        { id: 19, lat: 41.0082, long: 28.9784, name: 'Istanbul' },
        { id: 10, lat: 30.0444, long: 31.2357, name: 'Cairo' },
        { id: 30, lat: -1.2921, long: 36.8219, name: 'Nairobi' }, // Africa
        { id: 35, lat: -33.9249, long: 18.4241, name: 'Cape Town' }, // Africa
        { id: 4, lat: 33.9716, long: -6.8498, name: 'Morocco' },
        { id: 34, lat: -22.9068, long: -43.1729, name: 'Rio de Janeiro' }, // South America
        { id: 14, lat: -34.6037, long: -58.3816, name: 'Buenos Aires' },
        { id: 16, lat: 19.4326, long: -99.1332, name: 'Mexico City' },
        { id: 15, lat: 34.0522, long: -118.2437, name: 'Los Angeles' },
        { id: 33, lat: 43.6532, long: -79.3832, name: 'Toronto' }, // North America
        { id: 26, lat: 61.2181, long: -149.9003, name: 'Anchorage' }, // Alaska
    ].reverse(), []);

    // 2. Compute 3D positions
    const locationPositions = useMemo(() => {
        // Radius 5.4 to float slightly above earth (which is radius 5)
        return locations.map((loc, idx) => ({
            ...loc,
            idx, // Use index for highlighting logic
            pos: getPosition(loc.lat, loc.long, 5.4)
        }));
    }, [locations]);

    // 3. Create Web-like Connections (Path + Neighbors)
    const connections = useMemo(() => {
        const lines = [];

        // Connect sequential path (The "Tour")
        for (let i = 0; i < locationPositions.length; i++) {
            const current = locationPositions[i];
            const next = locationPositions[(i + 1) % locationPositions.length];

            // Main Path Lines (Thicker/Brighter)
            const dist = current.pos.distanceTo(next.pos);
            const mid = current.pos.clone().add(next.pos).multiplyScalar(0.5).normalize().multiplyScalar(5.5 + dist * 0.25);
            lines.push({ start: current.pos, end: next.pos, mid, isMain: true });
        }

        // Add some extra random local connections for "web" look
        locationPositions.forEach((locA, i) => {
            // Connect to 2 nearest non-sequential neighbors
            const neighbors = locationPositions
                .filter((_, idx) => idx !== i && idx !== (i + 1) % locationPositions.length && idx !== (i - 1 + locationPositions.length) % locationPositions.length)
                .map(locB => ({ locB, dist: locA.pos.distanceTo(locB.pos) }))
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 2);

            neighbors.forEach(({ locB }) => {
                const dist = locA.pos.distanceTo(locB.pos);
                if (dist < 3) { // Only if reasonably close
                    const mid = locA.pos.clone().add(locB.pos).multiplyScalar(0.5).normalize().multiplyScalar(5.4 + dist * 0.2);
                    lines.push({ start: locA.pos, end: locB.pos, mid, isMain: false });
                }
            });
        });

        return lines;
    }, [locationPositions]);

    // 4. Rotation Logic (Targeted)
    useFrame((state, delta) => {
        if (groupRef.current && isAutoRotating) {
            // Update local time only when auto-rotating
            localTimeRef.current += delta;

            const spinDuration = 2;
            const pauseDuration = 2;
            const cycleDuration = spinDuration + pauseDuration;
            const totalDuration = locations.length * cycleDuration;

            // Current global time in the animation sequence
            const t = localTimeRef.current % totalDuration;

            const currentIndex = Math.floor(t / cycleDuration);
            const timeInCycle = t % cycleDuration;

            // Update active hub for React state/UI
            if (currentIndex !== currentHubIndex) {
                setCurrentHubIndex(currentIndex);
                if (onHubChange) onHubChange(currentIndex);
            }

            // Target calculation
            // Target calculation
            const currentLoc = locations[currentIndex];

            // Y Rotation: Center Longitude + Offset for "Top Left"
            // -0.2 * PI is a calibrated "Left" position (approx -36 deg) that stays visible
            const targetRotY = -(currentLoc.long * Math.PI / 180) + (Math.PI * -0.2);

            // X Rotation: Fixed slight tilt to show structure, avoid extreme dynamic tilting
            const targetRotX = 0.1;

            if (timeInCycle < spinDuration) {
                // Spin Phase: Interpolate to target
                const curY = groupRef.current.rotation.y;
                let diff = targetRotY - curY;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;

                // Easing factor
                const factor = delta * 3;
                groupRef.current.rotation.y += diff * factor;
                groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * factor;
            } else {
                // Pause Phase: Lock to target
                groupRef.current.rotation.y = targetRotY;
                groupRef.current.rotation.x = targetRotX;
            }
        }
    });

    // 5. Dots Cloud (Highlight World Map)
    const particles = useMemo(() => {
        const p = [];
        // Dense cloud
        const count = 6000;
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            // Radius slightly above earth surface 5.0 -> 5.05
            const r = 5.05;

            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);
            p.push(x, y, z);
        }
        return new Float32Array(p);
    }, []);

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0]}>
            {/* 1. Solid Earth Sphere (No Transparency) */}
            <Sphere args={[4.95, 64, 64]}>
                <meshBasicMaterial
                    color="#000000"
                />
            </Sphere>

            {/* 2. Earth Texture - Slightly larger to sit on top of core */}
            <Sphere args={[5, 64, 64]}>
                <meshStandardMaterial
                    map={earthTexture}
                    roughness={0.6}
                    metalness={0.2}
                    emissive="#1a1a1a"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={1} /* Fully opaque texture */
                />
            </Sphere>

            {/* 3. Dots Layer */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.length / 3}
                        array={particles}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#8b5cf6"
                    sizeAttenuation
                    transparent
                    opacity={0.6}
                />
            </points>

            {/* 4. Locations & Markers - Pushed out further */}
            {locationPositions.map((loc, idx) => (
                <GlobeMarker
                    key={idx}
                    position={loc.pos}
                    isActive={idx === currentHubIndex}
                    texture={logoTexture}
                />
            ))}

            {/* 5. Connections */}
            {connections.map((line, i) => (
                <QuadraticBezierLine
                    key={i}
                    start={line.start}
                    end={line.end}
                    mid={line.mid}
                    color={line.isMain ? "#fbbf24" : "#6366f1"} // Gold for path, Purple for mesh
                    lineWidth={line.isMain ? 2.5 : 1}
                    transparent
                    opacity={line.isMain ? 0.2 : 0.08}
                    renderOrder={5}
                />
            ))}
        </group>
    );
};

const Globe = ({ onHubChange }) => {
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const resumeTimeoutRef = useRef();

    const handleStart = () => {
        setIsAutoRotating(false);
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const handleEnd = () => {
        resumeTimeoutRef.current = setTimeout(() => {
            setIsAutoRotating(true);
        }, 2000); // Resume after 2 seconds
    };

    return (
        <div className="absolute -right-36 -bottom-36 w-[600px] h-[600px] md:-right-60 md:-bottom-60 md:w-[800px] md:h-[800px] pointer-events-auto opacity-100 transition-all duration-500">
            <Canvas
                camera={{ position: [8, 4, 10], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
                <pointLight position={[-10, 5, -5]} intensity={1} color="#ffffff" />

                <React.Suspense fallback={null}>
                    <GlobeMesh onHubChange={onHubChange} isAutoRotating={isAutoRotating} />
                    <FloatingTitle3D />
                </React.Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    onStart={handleStart}
                    onEnd={handleEnd}
                    rotateSpeed={1.2}
                />
            </Canvas>
        </div>
    );
};

export { FloatingTitle3D };
export default Globe;
