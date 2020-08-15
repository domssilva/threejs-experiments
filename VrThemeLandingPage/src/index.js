import * as THREE from 'three';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls';
import {OBJLoader2} from '../node_modules/three/examples/jsm/loaders/OBJLoader2';

let scene, 
    camera,
    renderer, 
    canvas,
    plane,
    controls;

init();
renderLoop();

function init() {
    // main settings
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;

    canvas = document.body.appendChild( renderer.domElement );

    // controls
    controls = new OrbitControls(camera, canvas);
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.autoRotate = true;

    // positioning
    controls.target.set(0, 0, 0);
    camera.position.set(-1.5, -1.6, 18.32);

    // lights
    const light	= new THREE.AmbientLight( 0x202020 );
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    scene.add( light );
    
    // object, mtl loader
    const objLoader = new OBJLoader2();
    const assetsPath = './models';
    objLoader.load(`${assetsPath}/VR_headset.obj`, (model) => {
        model.position.set(0, 0, 0);
        model.scale.set(2, 2, 2);
        scene.add(model);
    });

    // plane
    const geometry = new THREE.PlaneGeometry( 50, 50, 10, 5 );
    const material = new THREE.MeshPhongMaterial( {color: 0xFFFFFF, wireframe: true, wireframeLinecap: 'butt', shininess: 3, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    
    scene.add( plane );
    plane.rotation.set(THREE.Math.degToRad(90), 0, 0);
    plane.position.set(0, -6, 0);

    // event listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', getCameraPosition, false);
}

function renderLoop(time) {
    requestAnimationFrame( renderLoop );

    waves( plane, .4, 2);
    controls.update();

    renderer.render( scene, camera );
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getCameraPosition() {
    console.log('camera position:', camera.position);
    console.log('camera rotation:', camera.rotation);
}

function waves(plane, waveSize, magnitude) {

    const theTime =  performance.now() * .001 ;
    const center = new THREE.Vector2(0,0);
    const vLength = plane.geometry.vertices.length;

    for (let i = 0; i < vLength; i++) {
        let v = plane.geometry.vertices[i];
        let dist = new THREE.Vector2(v.x, v.y).sub(center);

        v.z = Math.sin(dist.length()/- waveSize + (theTime)) * magnitude;
    }

    plane.geometry.verticesNeedUpdate = true;

}