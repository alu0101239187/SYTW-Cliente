import * as THREE from "three";

// Devuelve una figura aleatoria
export function getRandomFigure(min_x, max_x, min_y, max_y, min_z, max_z) {
  const geometry = getRandomGeometry();
  const material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  const figure = new THREE.Mesh(geometry.object, material);
  figure.castShadow = true;

  figure.position.x = Math.random() * (max_x - min_x) + min_x;
  figure.position.y = Math.random() * (max_y - min_y) + min_y;
  figure.position.z = Math.random() * (max_z - min_z) + min_z;

  return {
    name: geometry.name,
    sides: geometry.sides,
    regular: geometry.regular,
    object: figure,
  };
}

// Devuelve una geometría aleatoria
function getRandomGeometry() {
  const geometries = [
    getRandomCube(),
    getRandomCone(),
    getRandomCilinder(),
    getRandomDodecahedron(),
    getRandomIcosahedron(),
    getRandomOctahedron(),
    getRandomSphere(),
    getRandomTetrahedron(),
    getRandomTorus(),
    getRandomTorusKnot(),
  ];
  return geometries[Math.floor(Math.random() * geometries.length)];
}

// Devuelve un color aleatorio
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

// Devuelve un cubo aleatorio
function getRandomCube() {
  const size = Math.random() * (5 - 1) + 1;
  return {
    name: "Cubo",
    sides: "6",
    regular: true,
    object: new THREE.BoxGeometry(size, size, size),
  };
}

// Devuelve un cono aleatorio
function getRandomCone() {
  const radius = Math.random() * (5 - 1) + 1;
  const height = Math.random() * (5 - 1) + 1;
  return {
    name: "Cono",
    sides: "2",
    regular: false,
    object: new THREE.ConeGeometry(radius, height),
  };
}

// Devuelve un cilindro aleatorio
function getRandomCilinder() {
  const radius = Math.random() * (5 - 1) + 1;
  const height = Math.random() * (5 - 1) + 1;
  return {
    name: "Cilindro",
    sides: "3",
    regular: false,
    object: new THREE.CylinderGeometry(radius, radius, height),
  };
}

// Devuelve un dodecaedro aleatorio
function getRandomDodecahedron() {
  const radius = Math.random() * (5 - 1) + 1;
  return {
    name: "Dodecaedro",
    sides: "12",
    regular: true,
    object: new THREE.DodecahedronGeometry(radius),
  };
}

// Devuelve un icosaedro aleatorio
function getRandomIcosahedron() {
  const radius = Math.random() * (5 - 1) + 1;
  return {
    name: "Icosaedro",
    sides: "20",
    regular: true,
    object: new THREE.IcosahedronGeometry(radius),
  };
}

// Devuelve un octaedro aleatorio
function getRandomOctahedron() {
  const radius = Math.random() * (5 - 1) + 1;
  return {
    name: "Octaedro",
    sides: "8",
    regular: true,
    object: new THREE.OctahedronGeometry(radius),
  };
}

// Devuelve una esfera aleatoria
function getRandomSphere() {
  const radius = Math.random() * (5 - 1) + 1;
  return {
    name: "Esfera",
    sides: "1",
    regular: true,
    object: new THREE.SphereGeometry(radius),
  };
}

// Devuelve un tetraedro aleatorio
function getRandomTetrahedron() {
  const radius = Math.random() * (5 - 1) + 1;
  return {
    name: "Tetraedro",
    sides: "4",
    regular: true,
    object: new THREE.TetrahedronGeometry(radius),
  };
}

// Devuelve un toroide aleatorio
function getRandomTorus() {
  const radius = Math.random() * (5 - 1) + 1;
  const tube = Math.random() * (1 - 0.5) + 0.5;
  return {
    name: "Toroide",
    sides: "Variable",
    regular: false,
    object: new THREE.TorusGeometry(radius, tube),
  };
}

// Devuelve un nudo toroidal aleatorio
function getRandomTorusKnot() {
  const radius = Math.random() * (5 - 1) + 1;
  const tube = Math.random() * (1 - 0.5) + 0.5;
  return {
    name: "Nudo toroidal",
    sides: "Variable",
    regular: false,
    object: new THREE.TorusKnotGeometry(radius, tube),
  };
}
