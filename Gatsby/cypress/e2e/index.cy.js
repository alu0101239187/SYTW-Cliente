describe("Página de inicio", () => {
  it("Debería mostrar el título correcto", () => {
    cy.visit("/");

    cy.title().should("eq", "Noticias con Gatsby");
  });

  it("Debería contener un título", () => {
    cy.visit("/");

    cy.get('[data-testid="content"]')
      .find("h1")
      .should("have.text", "Noticias con Gatsby")
      .should("be.visible");
  });

  it("Debería contener tres noticias", () => {
    cy.visit("/");

    cy.get('[data-testid="content"]')
      .find('[data-testid="grid"]')
      .find('[data-testid="card"]')
      .should("have.length", 3);
  });

  it("Debería contener una imagen", () => {
    cy.visit("/");

    cy.get('[data-testid="content"]').find('[data-testid="static-image"]');
  });
});
