import './style.css'
import * as THREE from 'three';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js'; // import une camera déplaçable avec la souris
import {GLTFLoader} from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";


//import stars from "../stars/stars1;jpg"; // NE MARCHE PAS Pour ajouter un background image commencer par import element

//creer une scene
const scene = new THREE.Scene();

// creer une caméra avec 75° d'ouverture, une longeur et largeur = a la taille de la fenetre, zone visible par la caméra
const camera = new THREE.PerspectiveCamera(
  75, // degré ouverture caméra
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// le renderer et l'élément qui va afficher notre 3D
const renderer = new THREE.WebGLRenderer();
// met une couleur en background
renderer.setClearColor("rgb(36, 89, 83)")
// permet de controler avec la souris
const orbit = new OrbitControls(camera, renderer.domElement);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// bretzel element statique
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: "rgb(228, 147, 147)" });
//material.wireframe = true; affiche la structure de l'objet
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.set(-300, 0, 0)

// bretzel2 element en mouvement
const Bretzel = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const materialBretzel = new THREE.MeshStandardMaterial({ color: "rgb(228, 147, 347)" });
const Bretzel2 = new THREE.Mesh(Bretzel, materialBretzel);
scene.add(Bretzel2);
Bretzel2.position.set(300, 0, 0) // définit la position de l'objet

// ajout d'une lumiere ambiante  qui éclaire un minimum tout l'espace
const ambiantLight = new THREE.AmbientLight(0x555555);
scene.add(ambiantLight);

// ajout d'une lumière directionel qui permet de de donner de la perspective
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight)
directionalLight.position.set(-100, 300, 100) // indique la position de la lumière

// ajout d'une seconde lumiere en spotlight
const spotlight = new THREE.SpotLight(0xFFFFFF, 0.7);
scene.add(spotlight);
spotlight.position.set(0, 300, 0);


// ajout d'une aide pour mieux voir visuelement d'ou vient la lumière.
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(dLightHelper)

// ajout d'un seconde aide 
const sLightHelper = new THREE.SpotLightHelper(spotlight, 5)
scene.add(sLightHelper)


// insérer une image en background 
/*const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load("elementToLoad")*/
// insérer plusieurs image en background le fond est une cube à 6 faces
/*const cubeTextureLoader = new THREE.cubeTextureLoader();
scene.background = cubeTextureLoader.load([
    photo1,
    photo2,
    photo1,
    photo2,
    photo1,
    photo2,
])*/


// censé charge l'objet 3D//
let model;
const island = new URL('./asset/lowpoly_island.glb', import.meta.url);
const assetLoader = new GLTFLoader();
assetLoader.load(island.href, function(gltf){
	 model = gltf.scene;
	scene.add(model)
	model.position.set(0, -30, 0)
	model.rotation.y = 80;
})


camera.position.set(0, 0, 300); // X, y, z

function animate() {
    Bretzel2.rotation.x += 0.01; //entraine une rotation de l'élément Bretzel 
    Bretzel2.rotation.y += 0.01;
    renderer.render(scene, camera);
	
    
}

renderer.setAnimationLoop(animate) // permet la création d'une boucle 

// rendre la scene responsive NE MARCHE PAS :

/*window.addEventListener('resize', function(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth / window.innerHeight);
});*/