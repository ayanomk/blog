import { useEffect, useRef } from "react";
import * as THREE from "three";

function HeroThree() {
    const mountRef = useRef(null);
    
    useEffect(() => {
        // remove all canvas inside .heroThree div
        mountRef.current.innerHTML = "";

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
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor("#f0ede8");
        mountRef.current.appendChild(renderer.domElement);
        
        // Object
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: "#333"})
        );
        scene.add(box);

        renderer.render(scene, camera);

        // Clean up when page is closed etc
        return () => {
            const canvas = renderer.domElement;
            canvas.parentNode?.removeChild(canvas);
            renderer.dispose();
        }
    }, []);

    return <div ref={mountRef} className="heroThree" />
}

export default HeroThree