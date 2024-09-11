import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/EasyTransaction.css';

const EasyTransaction = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00a2ff, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="easy-transaction">
      <div className="container">
        <h2 className="section-title">Easy And Secure Transaction</h2>
        <div className="content-wrapper">
          <div className="text-content">
            <p>Experience a seamless and secure car buying process with our cutting-edge technology.</p>
            <ul>
              <li>Digital paperwork</li>
              <li>Secure online payments</li>
              <li>Virtual vehicle inspections</li>
              <li>Contactless delivery options</li>
            </ul>
            <button className="cta-button">Start Your Purchase</button>
          </div>
          <div className="animation-container" ref={mountRef}></div>
        </div>
      </div>
    </section>
  );
};

export default EasyTransaction;