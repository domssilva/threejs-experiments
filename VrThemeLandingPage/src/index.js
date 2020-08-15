import * as THREE from 'three';
import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls';
import {OBJLoader2} from '../node_modules/three/examples/jsm/loaders/OBJLoader2';

let scene, 
    camera,
    renderer, 
    canvas,
    plane,
    planeBuffer,
    controls;

init();
renderLoop();

function init() {
    // main settings
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    camera.position.z = 15; 
    camera.position.y = 2;

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
    controls.update();

    // positioning
    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 10);
    
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
        model.rotateY(70);
        scene.add(model);
    });

    // plane
    const geometry = new THREE.PlaneGeometry( 15, 20, 32 );
    const material = new THREE.MeshPhongMaterial( {color: 0x888888, wireframe: true, wireframeLinecap: 'butt', side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    plane.rotation.set(0, .4, THREE.Math.degToRad(90));
    plane.position.set(5, 0, 0);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);
}

function renderLoop(time) {
    requestAnimationFrame( renderLoop );

    // wave plane
    waves(plane, .8, 4);

    renderer.render( scene, camera );
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function wavesBuffer( waveSize, magnitude ) {

    const theTime =  performance.now() * .001;
    let pos = planeBuffer.geometry.attributes.position;
  
    let center = new THREE.Vector3(0,0,0);
    let vec3 = new THREE.Vector3(); // re-use
    for ( let i = 0, l = pos.count; i < l; i ++ ) {
  
      vec3.fromBufferAttribute(pos, i);
          vec3.sub(center);
      
      let z = Math.sin( vec3.length() /- waveSize + (theTime)) * magnitude;
      
      pos.setZ(i, z);
  
    }
  
    pos.needsUpdate = true
  
}

function waves( plane, waveSize, magnitude ){

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