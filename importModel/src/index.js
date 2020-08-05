import * as THREE from 'three';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls';
import {OBJLoader2} from '../node_modules/three/examples/jsm/loaders/OBJLoader2';

// main settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
const canvas = document.body.appendChild( renderer.domElement );

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = true;
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.update();

// positioning
controls.target.set(0, 0, 0);
camera.position.z = 5;

// object loader
const assetsPath = './models';         // specify asset's location to find .obj, .mtl, etc...
const objLoader = new OBJLoader2();
objLoader.load(`${assetsPath}/car.obj`, (model) => {
    scene.add(model);
})

const renderLoop = () => {
    requestAnimationFrame( renderLoop );

    renderer.render( scene, camera );
};

renderLoop();