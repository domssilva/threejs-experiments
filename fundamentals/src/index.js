import * as THREE from 'three'; // load three.js

function main() {
    // select canvas
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // main three.js object
    const renderer = new THREE.WebGLRenderer({canvas}); 

    // you pass a scene and a camera to a renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

    // creating a mesh (parameters: geometry, material)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);

    // add mesh to your scene
    scene.add(cube);

    // edit camera position
    camera.position.z = 2;

    // finally, tell renderer to render everything
    renderer.render(scene, camera);
}

console.log(PerspectiveCamera);
main();
