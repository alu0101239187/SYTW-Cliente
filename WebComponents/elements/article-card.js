class ArticleCard extends HTMLElement {
  static counter = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("Carta de artículo creada");
  }

  async connectedCallback() {
    const response = await fetch("./elements/templates/article-card.html");
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#article-card");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("Carta de artículo adjuntada al DOM");
    this.updateAttributes();
    // Button events
    const button = this.shadowRoot.querySelector("button");
    button.id = "button-" + ArticleCard.counter++;
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      if (button.classList.contains("active")) {
        button.textContent = "Ocultar valoraciones";
      } else {
        button.textContent = "Mostrar valoraciones";
      }
      this.dispatchEvent(
        new CustomEvent("show-assessments", {
          detail: {
            title: this.title,
            hide: !button.classList.contains("active"),
            button_id: button.id,
          },
          bubbles: true,
          composed: true,
        })
      );
    });
    document.addEventListener("show-assessments", (event) => {
      if (event.detail.button_id !== button.id) {
        button.classList.remove("active");
        button.textContent = "Mostrar valoraciones";
      }
    });
  }

  disconnectedCallback() {
    console.log("Carta de artículo separada del DOM");
  }

  get observedAttributes() {
    return ["title", "text", "days-published"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateAttribute(name, newValue);
      console.log(
        `Cambiado atributo ${name} de ${oldValue} a ${newValue} en una carta de artículo`
      );
    }
  }

  updateAttributes() {
    const title = this.getAttribute("title") || "";
    this.shadowRoot.getElementById("title").textContent = title;
    const text = this.getAttribute("text") || "";
    this.shadowRoot.getElementById("text").textContent = text;
    const days_published = this.getAttribute("days-published") || "";
    this.shadowRoot.getElementById("days-published").textContent =
      "Publicado hace " + days_published + " días";
  }
}

customElements.define("article-card", ArticleCard);
