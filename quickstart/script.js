// MAIN 3 OBJECTS: 1.RENDERER - 2.SCENE - 3.CAMERA
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);    // set canvas the size of the entire page
document.body.appendChild(renderer.domElement);             // add canvas to DOM

const scene = new THREE.Scene();                            // everything you want three.js to draw needs to be added to the scene

const fov = 75;                                             // Field of View
const aspect = window.innerWidth / window.innerHeight;      // display aspect of canvas
const near = 0.1;                                           // space in front of the camera
const far = 1000;                                           // space in front of the camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// creating a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);            // parameters: width, height, depth
const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const mesh = new THREE.Mesh( geometry, material );

// add mesh to the scene
scene.add( mesh );

// render scene
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;    

    renderer.render( scene, camera );
}

animate();
