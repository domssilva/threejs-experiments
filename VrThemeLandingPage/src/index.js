import * as THREE from 'three';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls';
import {OBJLoader2} from '../node_modules/three/examples/jsm/loaders/OBJLoader2';
import {MTLLoader} from '../node_modules/three/examples/jsm/loaders/MTLLoader';
import {MtlObjBridge} from '../node_modules/three/examples/jsm/loaders/obj2/bridge/MtlObjBridge';

// main settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 15; 
camera.position.y = 2;

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
camera.position.set(0, 0, 10);

// object, mtl loader
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader2();
const assetsPath = './models';

// Or create a three.js material
objLoader.load(`${assetsPath}/VR_headset.obj`, (model) => {
    model.position.set(0, 0, 0);
    model.rotateY(70);
    scene.add(model);
});

const renderLoop = () => {
    requestAnimationFrame( renderLoop );


    renderer.render( scene, camera );
};

renderLoop();