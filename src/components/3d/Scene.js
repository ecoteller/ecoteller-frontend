import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Scene(props) {
  const containerRef = useRef(null) || props.containerRef;
  const canvasRef = useRef(null);

  const loader = new FBXLoader();

  useEffect(() => {
    const containerWidth = containerRef?.current.clientWidth || window.innerWidth;
    const containerHeight = containerRef?.current.clientHeight || window.innerHeight;

    // Create scene, camera, renderer, etc.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(containerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('assets/images/logo/ecoteller-logo.png');

    // Create geometries, materials, and meshes
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const cube = new THREE.Mesh(geometry, material);
    cube.scale.set(1, 1, 1);
    cube.castShadow = true;
    // scene.add(cube);

    loader.load(
      'assets/3d/plate/plate.fbx',
      (plate) => {
        plate.scale.set(0.05, 0.05, 0.05);
        plate.rotateX(THREE.MathUtils.degToRad(30));
        plate.position.set(0, 0, 0);
        // scene.add(plate);

        const animate = () => {
          // plate.rotation.x += 0.01;
          // plate.rotation.z += 0.01;

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      },
      (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100, '% loaded');
      },
      (error) => {
        // Error callback
        console.error('Error loading plate model', error);
      }
    );

    loader.load(
      'assets/3d/plant/plant.fbx',
      (plant) => {

        plant.traverse((child) => {
          if (child.isMesh) {
            if (child.name === 'Circle003' || child.name === 'Circle015') {
              child.visible = false;
            }
          }
        });

        plant.scale.set(0.03, 0.03, 0.03);
        plant.position.set(0, -3, 0);
        scene.add(plant);

        const animate = () => {
          plant.rotation.y += 0.01;
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      },
      (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100, '% loaded');
      },
      (error) => {
        // Error callback
        console.error('Error loading plant model', error);
      }
    );

    // Add lights, controls, or other Three.js components as needed
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 25;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update object positions, rotations, or any other animations here
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Scene;
