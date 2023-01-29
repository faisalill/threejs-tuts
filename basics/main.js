import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'




const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const orbitControl = new OrbitControls(camera,renderer.domElement)
// orbitControl.enableDamping = true
// orbitControl.minDistance = 5
// orbitControl.maxDistance = 15
// orbitControl.enablePan = false
// orbitControl.maxPolarAngle = Math.PI / 2 - 0.05
// orbitControl.update();


// const gui = new dat.GUI()
// const options = {
//   cubeColor:'#ffffff'
// }
// gui.addColor(options,'cubeColor').onChange(function(e){
//   box.material.color.set(e)
// })


const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)
camera.position.set(0,4,-5)
orbitControl.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 'aqua'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)
box.position.set(5,0,0)

const planeGeometry = new THREE.PlaneGeometry(10,10)
const planeMaterial = new THREE.MeshBasicMaterial({color:'lightblue',
side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotation.x = -Math.PI/2

// CONTROL KEYS
const keysPressed = {  }

document.addEventListener('keydown', (event) => {
    if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle()
    } else {
        (keysPressed)[event.key.toLowerCase()] = true
    }
}, false);
document.addEventListener('keyup', (event) => {
    (keysPressed)[event.key.toLowerCase()] = false
}, false);

// const directionalLight = new THREE.DirectionalLight('white',1)
// scene.add(directionalLight)
const ambientLight = new THREE.AmbientLight('white',0.8)
scene.add(ambientLight)


const loader = new GLTFLoader()
loader.load('./models/player.glb',(gltf)=>{
  const model = gltf.scene
  scene.add(model)
},undefined,(error)=>{console.log(error)}
)



function animate(){
  
  box.rotation.x -= 0.01
  box.rotation.y -= 0.01
  box.rotation.z -= 0.01

  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)
