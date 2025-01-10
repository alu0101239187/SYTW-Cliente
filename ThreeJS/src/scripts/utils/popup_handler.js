import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";

// Muestra un popup donde se encuentre el ratón con la información de la figura seleccionada
export function displayPopup(x, y, figure) {
  popup.style.display = "block";
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;

  popup.innerHTML = `
        Nombre: ${figure.name}<br/>
        Caras: ${figure.sides}<br/>
        ${figure.regular ? "Regular" : "Irregular"}<br/><br/>
        Color: #${figure.object.material.color
          .getHexString()
          .toUpperCase()}<br/>
        Posición: (${figure.object.position.x.toFixed(2)}, 
                    ${figure.object.position.y.toFixed(2)}, 
                    ${figure.object.position.z.toFixed(2)})<br/><br/>
    `;

  const downloadButton = document.createElement("button");
  downloadButton.innerText = "Descargar Malla";
  downloadButton.onclick = () => downloadMesh(figure);
  popup.appendChild(downloadButton);
}

// Oculta el popup
export function hidePopup() {
  popup.style.display = "none";
}

// Descargar la malla del objeto seleccionado en formato OBJ
function downloadMesh(figure) {
  const exporter = new OBJExporter();
  const data = exporter.parse(figure.object);
  const blob = new Blob([data], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${figure.name}.obj`;
  link.click();
}
