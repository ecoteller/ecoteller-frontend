import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Scene(props) {
  const containerRef = useRef(null) || props.containerRef;
  const canvasRef = useRef(null);
  const [plantReady, setPlantReady] = useState(false);
  const [plateReady, setPlateReady] = useState(false);

  const loader = new FBXLoader();

  useEffect(() => {
    const containerWidth = containerRef?.current.clientWidth || window.innerWidth;
    const containerHeight = containerRef?.current.clientHeight || window.innerHeight;

    // Create scene, camera, renderer, etc.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(containerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;

    loader.load(
      'assets/3d/plate/plate.fbx',
      (plate) => {
        plate.scale.set(0.05, 0.05, 0.05);
        plate.rotateX(THREE.MathUtils.degToRad(30));
        plate.position.set(0, 0, 0);
        scene.add(plate);

        const animate = () => {
          plate.rotation.x += 0.001;
          plate.rotation.z += 0.001;

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      },
      (xhr) => {
        if (xhr.loaded / xhr.total === 1) {
          setPlateReady(true);
        }
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
        // scene.add(plant);

        const animate = () => {
          plant.rotation.y += 0.01;
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      },
      (xhr) => {
        if (xhr.loaded / xhr.total === 1) {
          setPlantReady(true);
        }
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

    // Cleanup function
    return () => {
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (plantReady && plateReady) {
      console.log('ready');
    }
  }, [plantReady, plateReady]);

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Scene;
