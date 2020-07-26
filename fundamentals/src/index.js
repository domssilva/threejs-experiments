//import THREE lib
import * as THREE from 'three';

function main() {
    const canvas = document.getElementById('canvas');

    // 3 essential objects: renderer, scene and camera
    const renderer = new THREE.WebGLRenderer({canvas});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.z = 5;

    // mesh construction
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); // this material is affected by lights!
    const cube = new THREE.Mesh( geometry, material );
    
    // creating a light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    
    // add everything to the scene
    scene.add( camera );
    scene.add( cube );
    scene.add(light);
    
    // render in full native resolution
    renderer.setPixelRatio(window.devicePixelRatio);

    function render(time) {
        time *= 0.001; // convert time to seconds
    
        cube.rotation.x = time;
        cube.rotation.y = time;
    
        renderer.render(scene, camera);
    
        // Request to the browser that you want to animate something
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
    
}

main();
