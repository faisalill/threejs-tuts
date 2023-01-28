import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

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

const gui = new dat.GUI()
const options = {
  cubeColor:'#ffffff'
}
gui.addColor(options,'cubeColor').onChange(function(e){
  box.material.color.set(e)
})


const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)
camera.position.set(10,10,10)
orbitControl.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 'aqua'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(10,10)
const planeMaterial = new THREE.MeshBasicMaterial({color:'lightblue',
side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotation.x = -Math.PI/2
function animate(){
  
  box.rotation.x -= 0.01
  box.rotation.y -= 0.01
  box.rotation.z -= 0.01

  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)
