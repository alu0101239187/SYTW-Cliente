describe("Navegación", () => {
  it('Debería navegar a la página "Tecnología"', () => {
    cy.visit("/");
    cy.title().should("eq", "Noticias con Gatsby");
    cy.contains("Noticias con Gatsby").should("be.visible");

    cy.get('[data-testid="technology-link"]').click();
    cy.url().should("include", "/technology");
    cy.title().should("eq", "Tecnología");
    cy.contains("Tecnología").should("be.visible");
  });
  it('Debería navegar a la página "Ecología"', () => {
    cy.visit("/");
    cy.title().should("eq", "Noticias con Gatsby");
    cy.contains("Noticias con Gatsby").should("be.visible");

    cy.get('[data-testid="ecology-link"]').click();
    cy.url().should("include", "/ecology");
    cy.title().should("eq", "Ecología");
    cy.contains("Ecología").should("be.visible");
  });

  it('Debería navegar a la página "Economía"', () => {
    cy.visit("/");
    cy.title().should("eq", "Noticias con Gatsby");
    cy.contains("Noticias con Gatsby").should("be.visible");

    cy.get('[data-testid="economy-link"]').click();
    cy.url().should("include", "/economy");
    cy.title().should("eq", "Economía");
    cy.contains("Economía").should("be.visible");
  });
});
