import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { getRandomFigure } from "./utils/random_generators";
import { initStats } from "./utils/stats_handler";
import { displayPopup, hidePopup } from "./utils/popup_handler";

var stats = initStats();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xeeeeee));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

const figures = [];
addFigures(figures, scene);

camera.position.x = -40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(scene.position);

const cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.target.set(scene.position.x, scene.position.y, scene.position.z);
cameraControls.update();

const ambientLight = new THREE.AmbientLight(0x404040, 5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 8, 0, Math.PI / 4, 0, 0.5);
spotLight.position.set(-30, 50, -30);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight);

document.body.appendChild(renderer.domElement);

const controls = new (function () {
  this.rotationSpeed = 0.02;
})();
const gui = new dat.GUI();
gui.add(controls, "rotationSpeed", 0, 0.5);

function animate() {
  stats.update();

  figures.forEach((figure) => {
    figure.object.rotation.x += controls.rotationSpeed;
    figure.object.rotation.y += controls.rotationSpeed;
    figure.object.rotation.z += controls.rotationSpeed;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Redimensiona la escena al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Escucha los clics del ratón para seleccionar la figura
window.addEventListener("click", (event) => {
  var vector = new THREE.Vector3(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  vector = vector.unproject(camera);

  const raycaster = new THREE.Raycaster(
    camera.position,
    vector.sub(camera.position).normalize()
  );

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const selectedFigure = intersects[0].object;
    if (selectedFigure !== plane) {
      const figure = figures.find((figure) => figure.object === selectedFigure);
      displayPopup(event.clientX, event.clientY, figure);
      return;
    }
  }
  hidePopup();
});

// Escucha los clics al botón para limpiar y añadir figuras
document.getElementById("btn").addEventListener("click", () => {
  cleanFigures(figures, scene);
  addFigures(figures, scene);
});

// Añade figuras a la escena
function addFigures(figures, scene) {
  for (let i = 0; i < 6; i++) {
    const figure = getRandomFigure(-25, 25, 6, 10, -25, 25);
    figures.push(figure);
    scene.add(figure.object);
  }
}

// Limpia las figuras de la escena
function cleanFigures(figures, scene) {
  figures.forEach((figure) => {
    scene.remove(figure.object);
  });
  figures.length = 0;
}
