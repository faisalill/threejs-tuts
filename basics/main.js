import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
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



const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)
camera.position.set(0,1,5)
orbitControl.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 'aqua'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
scene.add(box)

function animate(time){
  
  box.rotation.x -= 0.01
  box.rotation.y -= 0.01
  box.rotation.z -= 0.01

  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)
