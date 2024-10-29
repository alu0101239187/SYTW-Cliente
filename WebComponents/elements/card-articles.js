const API_KEY = "6361a77af3654592b97b82f15a76bd4f";

class CardArticles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const response = await fetch("./elements/templates/card-articles.html");
    const templateText = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;
    const template = tempDiv.querySelector("#card-articles");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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

  async fetchData(path) {
    const response = await fetch(path);
    const json = await response.json();
    return json;
  }

  async generateArticles(topic) {
    const articles = this.shadowRoot.querySelector("#articles");
    const data = await this.fetchData(
      `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`
    );
    let counter = 0;
    while (articles.querySelectorAll("div").length < 3) {
      if (data.articles[counter].title !== "[Removed]") {
        const article = document.createElement("div");
        article.classList.add("article");
        // Title
        const title = document.createElement("h3");
        title.textContent = data.articles[counter].title;
        article.appendChild(title);
        // Content
        const content = document.createElement("p");
        content.textContent = data.articles[counter].content;
        content.style.marginBottom = "auto";
        article.appendChild(content);
        // Days published
        const days_published = document.createElement("p");
        const days = Math.floor(
          (new Date() - new Date(data.articles[counter].publishedAt)) / 86400000
        );
        days_published.textContent = "Publicado hace " + days + " días";
        days_published.style.fontSize = "0.8em";
        article.appendChild(days_published);
        // Show assessments button
        const show_button = document.createElement("button");
        show_button.id = "show-button-" + counter;
        show_button.classList.add("show-button");
        show_button.textContent = "Mostrar valoraciones";
        show_button.addEventListener("click", () => {
          show_button.classList.toggle("active");
          if (show_button.classList.contains("active")) {
            show_button.textContent = "Ocultar valoraciones";
          } else {
            show_button.textContent = "Mostrar valoraciones";
          }
          this.dispatchEvent(
            new CustomEvent("show-assessments", {
              detail: {
                title: title.textContent,
                hide: !show_button.classList.contains("active"),
                button_id: show_button.id,
              },
              bubbles: true,
              composed: true,
            })
          );
        });
        this.addEventListener("show-assessments", (event) => {
          if (event.detail.button_id !== show_button.id) {
            show_button.classList.remove("active");
            show_button.textContent = "Mostrar valoraciones";
          }
        });
        article.appendChild(show_button);
        articles.appendChild(article);
      }
      counter++;
    }
  }

  async search() {
    const topic = this.shadowRoot.querySelector("#search-textfield").value;
    if (topic === "") return;
    const articles = this.shadowRoot.querySelector("#articles");
    const divs = articles.querySelectorAll("div");
    divs.forEach((div) => articles.removeChild(div));
    this.generateArticles(topic);
  }
}

customElements.define("card-articles", CardArticles);
