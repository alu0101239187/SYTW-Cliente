import "./article-card.js";

const API_KEY = "6361a77af3654592b97b82f15a76bd4f";

class ArticlesComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("Componente artículos creado");
  }

  async connectedCallback() {
    const response = await fetch(
      "./elements/templates/articles-component.html"
    );
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#articles-component");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("Componente artículos adjuntado al DOM");
    // Search events
    this.shadowRoot
      .querySelector("#search-button")
      .addEventListener("click", () => this.search());
    this.shadowRoot
      .querySelector("#search-textfield")
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          this.search();
        }
      });
  }

  disconnectedCallback() {
    console.log("Componente artículos separado del DOM");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Cambiado atributo ${name} de ${oldValue} a ${newValue} en el componente artículos`
    );
  }

  async fetchData(path) {
    const response = await fetch(path);
    const json = await response.json();
    return json;
  }

  async generateArticles(data) {
    // Remove previous articles
    const articles = this.shadowRoot.querySelector("#articles");
    const cards = articles.querySelectorAll("article-card");
    cards.forEach((card) => articles.removeChild(card));
    // Add new articles
    let counter = 0;
    while (articles.querySelectorAll("article-card").length < 3) {
      if (data.articles[counter].title !== "[Removed]") {
        const article = document.createElement("article-card");
        article.setAttribute("title", data.articles[counter].title);
        article.setAttribute("text", data.articles[counter].content);
        article.setAttribute(
          "days-published",
          Math.floor(
            (new Date() - new Date(data.articles[counter].publishedAt)) /
              86400000
          )
        );
        articles.appendChild(article);
      }
      counter++;
    }
  }

  async search() {
    const topic = this.shadowRoot.querySelector("#search-textfield").value;
    if (topic === "") return;
    const data = await this.fetchData(
      `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`
    );
    this.generateArticles(data);
  }
}

customElements.define("articles-component", ArticlesComponent);
