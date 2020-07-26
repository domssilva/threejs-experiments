//import THREE lib
import * as THREE from 'three';

const canvas = document.getElementById('canvas');

// the 3 main objects: renderer, scene and camera
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true, // transparent bg
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer.setSize( window.innerWidth, window.innerHeight );

const cubes = [
    makeCube(0xd16f06, -2),
    makeCube(0x0080ff),
    makeCube(0x5c2275, 2)
];

cubes.map(mesh => scene.add(mesh));

camera.position.z = 5;

function makeCube(color, x=0) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );

    cube.position.x = x;

    return cube;
}

const animate = function () {
    requestAnimationFrame( animate );

    cubes.forEach((mesh, idx) => {

        if (idx === 0) {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;    
        } 

        mesh.rotation.x += 0.01 * idx;
        mesh.rotation.y += 0.01 * idx;    
    });

    // avoid objects distortion/blurriness on windows resize event
    const renderedCanvas = renderer.domElement;
    camera.aspect = renderedCanvas.clientWidth / renderedCanvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.render( scene, camera );
};

animate();