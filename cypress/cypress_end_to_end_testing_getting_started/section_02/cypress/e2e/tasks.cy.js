/// <reference types="Cypress" />

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();

    // when the cypress click an element by default picks the center of the item.
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });
});
