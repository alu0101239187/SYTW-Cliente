class CardAssessments extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch("./elements/templates/card-assessments.html");
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#card-assessments");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // Show event
    document.addEventListener("show-assessments", (event) => {
      this.generateAssessments(event.detail.title, event.detail.hide);
    });
  }

  async fetchData(path) {
    const response = await fetch(path);
    console.log(response);
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
    const divs = assessments.querySelectorAll("div");
    divs.forEach((div) => assessments.removeChild(div));
    // Add new assessments
    const data = await this.fetchData("./data/assessments.json");
    data.assessments.forEach((element) => {
      const assessment = document.createElement("div");
      assessment.classList.add("assessment");
      const content = document.createElement("p");
      content.textContent = element.assessment;
      assessment.appendChild(content);
      const author = document.createElement("p");
      author.textContent = element.author;
      author.style.fontWeight = "bold";
      assessment.appendChild(author);
      assessments.appendChild(assessment);
    });
  }
}

customElements.define("card-assessments", CardAssessments);
