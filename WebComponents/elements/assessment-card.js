class AssessmentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("Carta de valoración creada");
  }

  async connectedCallback() {
    const response = await fetch("./elements/templates/assessment-card.html");
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#assessment-card");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("Carta de valoración adjuntada al DOM");
    this.updateAttributes();
  }

  disconnectedCallback() {
    console.log("Carta de valoración separada del DOM");
  }

  get observedAttributes() {
    return ["text", "author"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      console.log(
        `Cambiado atributo ${name} de ${oldValue} a ${newValue} en una carta de valoración`
      );
    }
  }

  updateAttributes() {
    const text = this.getAttribute("text") || "";
    const author = this.getAttribute("author") || "";
    this.shadowRoot.getElementById("text").textContent = text;
    this.shadowRoot.getElementById("author").textContent = author;
  }
}

customElements.define("assessment-card", AssessmentCard);
