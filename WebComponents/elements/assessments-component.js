import "./assessment-card.js";

class AssessmentsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("Componente valoraciones creado");
  }

  async connectedCallback() {
    const response = await fetch(
      "./elements/templates/assessments-component.html"
    );
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#assessments-component");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("Componente valoraciones adjuntado al DOM");
    // Show event
    document.addEventListener("show-assessments", (event) => {
      this.generateAssessments(event.detail.title, event.detail.hide);
    });
  }

  disconnectedCallback() {
    console.log("Componente valoraciones separado del DOM");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Cambiado atributo ${name} de ${oldValue} a ${newValue} en el componente valoraciones`
    );
  }

  async fetchData(path) {
    const response = await fetch(path);
    const json = await response.json();
    return json;
  }

  async generateAssessments(article_title, hide) {
    const container = this.shadowRoot.querySelector("#container");
    hide
      ? (container.style.display = "none")
      : (container.style.display = "flex");
    if (hide) {
      return;
    }
    // Title
    const title = this.shadowRoot.querySelector("#title");
    title.textContent = 'Valoraciones de "' + article_title + '"';
    // Remove previous assessments
    const assessments = this.shadowRoot.querySelector("#assessments");
    const cards = assessments.querySelectorAll("assessment-card");
    cards.forEach((card) => assessments.removeChild(card));
    // Add new assessments
    const data = await this.fetchData("./data/assessments.json");
    data.assessments.forEach((element) => {
      const assessment = document.createElement("assessment-card");
      assessment.setAttribute("text", element.assessment);
      assessment.setAttribute("author", element.author);
      assessments.appendChild(assessment);
    });
  }
}

customElements.define("assessments-component", AssessmentsComponent);
