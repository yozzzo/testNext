'use client';

import React, { useEffect, useRef } from 'react';
import 'mind-ar/dist/mindar-image.prod.js';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function MindARViewer() {
  const sceneRef = useRef<CustomSceneElement>(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    if (sceneEl && sceneEl.systems['mindar-image-system']) {
      const arSystem = sceneEl.systems['mindar-image-system'];

      sceneEl.addEventListener('renderstart', () => {
        arSystem.start(); // start AR
      });

      return () => {
        if (sceneEl) {
          arSystem.stop(); // stop AR
        }
      };
    }
  }, []);

  return (
    <>
      <button
        onClick={() => {
          const sceneEl = sceneRef.current;
          if (sceneEl) {
            const arSystem = sceneEl.systems['mindar-image-system'];
            arSystem.start(); // start AR
          }
        }}
      >
        hoge
      </button>
      <a-scene
        ref={sceneRef}
        networked-scene
        mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img
            id="card"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png"
          />
          <a-asset-item
            id="avatarModel"
            src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            src="#card"
            position="0 0 0"
            height="0.552"
            width="1"
            rotation="0 0 0"
          ></a-plane>
          <a-gltf-model
            rotation="0 0 0 "
            position="0 0 0.1"
            scale="0.005 0.005 0.005"
            src="#avatarModel"
            animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>
      </a-scene>
      <video></video>
    </>
  );
}
