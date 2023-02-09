import {
    BoxGeometry,
    Scene,
    Color,
    DirectionalLight,
    PerspectiveCamera,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    WebGLRenderer
}

from '../node_modules/three/build/three.module.js';

import {
    FontLoader
}

from '../node_modules/three/examples/jsm/loaders/FontLoader.js'

import {
    TextGeometry
}

from '../node_modules/three/examples/jsm/geometries/TextGeometry.js'
import { MathUtils } from 'three';

let scene, camera, renderer, cubes = [];

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#191919');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("container").appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(5, 0.05, 0.05);
    let material = new THREE.MeshLambertMaterial({ color:'red' });

    for (let i = 0; i < 2500; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = (Math.random() * 100) -50;
        cube.position.y = (Math.random() * 100) -50;
        cube.position.z = (Math.random() * 100) -50;

        scene.add(cube);
        cubes.push(cube);
    }

    let light = new THREE.PointLight('red', 200, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    let fontLoader = new FontLoader();
    fontLoader.load('../node_modules/three/examples/fonts/jfont.json', function (font) {
      let textGeometry = new TextGeometry('ざざざ', {
        font: font,
        size: 2,
        height: 0.5
      });
      let textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
      let textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.z = -5;
      scene.add(textMesh);


  let shadowMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
  let shadowMesh = new THREE.Mesh(textGeometry, shadowMaterial);
  shadowMesh.position.z = -5;
  shadowMesh.position.x = 0.1;
  shadowMesh.position.y = -0.1;
  scene.add(shadowMesh);
    });
}

function animate() {
    requestAnimationFrame(animate);
    for (let i = 0; i < cubes.length; i++) {
        cubes[i].position.x += 0.25;
        cubes[i].position.y += 0.25;
        cubes[i].position.z += 0.05;
    
        cubes[i].rotation.x = THREE.MathUtils.degToRad(-60);
        cubes[i].rotation.y = THREE.MathUtils.degToRad(-45);
        cubes[i].rotation.z = THREE.MathUtils.degToRad(15);
    
        cubes[i].rotation.x += 0.05;
    
        if (cubes[i].position.x > 50) {
            cubes[i].position.x = -50;
        }
        if (cubes[i].position.y > 50) {
            cubes[i].position.y = -50;
        }
        if (cubes[i].position.z > 50) {
            cubes[i].position.z = -50;
        }
    }
    renderer.render(scene, camera);
}