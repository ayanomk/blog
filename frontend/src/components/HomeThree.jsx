import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

function HeroThree() {
    const mountRef = useRef(null);
    
    useEffect(() => {
        // remove all canvas inside .heroThree div
        mountRef.current.innerHTML = "";
        const PI = 3.14;

        // Scene
        const scene = new THREE.Scene();

        // Size
        const sizes = {
            width: mountRef.current.clientWidth,
            height: mountRef.current.clientHeight
        }

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
        camera.position.z = 2;
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor("#f0ede8");
        mountRef.current.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight("#a72525", 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight("#dfedff", 2);
        directionalLight.rotation.x = 3.14 * 0.5;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        scene.add(directionalLight); 
        // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, "#222");
        // scene.add(directionalLightHelper)
        
        // Object
        // backpack
        const gltfLoader = new GLTFLoader();
        const backpackGroup = new THREE.Group();
        backpackGroup.position.set(1.6, - 0.4, 0);
        backpackGroup.rotation.y = PI;
        scene.add(backpackGroup);
        gltfLoader.load(
            '/models/newBackpack.glb',
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        switch (child.name) {
                            case "body":
                                child.material = new THREE.MeshStandardMaterial({color: "#bc9a9f"});
                                break;
                            case "pocket":
                                child.material = new THREE.MeshStandardMaterial({color: "#78525b"});
                                break;
                            case "lid":
                                child.material = new THREE.MeshStandardMaterial({color: "#784b56"});
                                break;
                            case "straps":
                                child.material = new THREE.MeshStandardMaterial({color: "#ffa024"});
                                break;
                            case "shoulder":
                                child.material = new THREE.MeshStandardMaterial({color: "#784b56"});
                                break;
                            case "buckle":
                                child.material = new THREE.MeshStandardMaterial({color: "#140d19"});
                                break;
                            default:
                                child.material = new THREE.MeshStandardMaterial({color: "#fff"});
                                break;
                        }
                    }

                })
                model.scale.set(1.75, 1.75, 1.75);
                model.position.set(0.4, - 1, 0);
                model.rotation.z = PI * 0.1;
                backpackGroup.add(model);
            }
        )
        // text
        const fontLoader = new FontLoader();
        fontLoader.load(
            '/font/IMFellFrenchCanonSC-Regular.json',
            (font) => {
                const textGeometry = new TextGeometry(
                    "little\nadventures",
                    {
                        font: font,
                        size: 2.8,
                        depth: 0.2,
                        curveSegments: 5,
                    }
                )
                textGeometry.center();
                const text = new THREE.Mesh(textGeometry, new THREE.MeshStandardMaterial({color: "#784b56"}));
                text.position.z = - 9;
                text.position.x = - 3;
                text.position.y = 2;
                scene.add(text);
            }
        )
        // particles
        const textureLoader = new THREE.TextureLoader();
        const particleTexture = textureLoader.load('/texture/fire_02.png');
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
            positions[i * 3 + 2] = - (Math.random()) * 10;            
        }
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: "#ffa024", size: 0.2, transparent: true, alphaMap: particleTexture}));
        scene.add(particles);

        renderer.render(scene, camera);
        
        // RESIZE
        const handleResize = () => {
            if (!mountRef.current) return;
            sizes.width = mountRef.current.clientWidth;
            sizes.height = mountRef.current.clientHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        window.addEventListener('resize', handleResize);

        //  MOUSEMOVE
        const mouse = {
            x: 0,
            y: 0
        }
        const mouseMove = (e) => {
            mouse.x = (e.clientX / sizes.width) - 0.5;
            mouse.y = (e.clientY / sizes.height) - 0.5;
        }
        window.addEventListener('mousemove', mouseMove);

        let time = Date.now();
        // ANIMATION
        const tick = () => {
            const currentTime = Date.now();
            const deltaTime = currentTime - time;
            time = currentTime;

            backpackGroup.rotation.y += 0.0002 * deltaTime;

            // mousemove animation
            const parallaxX = mouse.x * 0.8;
            const parallaxY = - mouse.y * 0.5;
            camera.position.x += (parallaxX - camera.position.x) * 0.0008 * deltaTime;
            camera.position.y += (parallaxY - camera.position.y) * 0.0008 * deltaTime ;

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        }
        tick();

        // Clean up when page is closed etc
        return () => {
            const canvas = renderer.domElement;
            canvas.parentNode?.removeChild(canvas);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', mouseMove);
            renderer.dispose();
        }
    }, []);

    return <div ref={mountRef} className="heroThree" />
}

export default HeroThree