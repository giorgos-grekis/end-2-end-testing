describe("contact form", () => {
  it("should submit the form", () => {
    // cy.visit("http://localhost:5173/about");
    // cy.get('[data-cy="contact-input-message"]').type("Hello World");
    // cy.get('[data-cy="contact-input-name"]').type("John Doe");
    // cy.get('[data-cy="contact-input-email"]').type("test@test.com");
    // cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    // cy.get('[data-cy="contact-btn-submit"]').should("not.have.attr", "disabled");

    // cy.get('[data-cy="contact-btn-submit"]').click();

    // // check if the button is disable
    // cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
    // cy.get('[data-cy="contact-btn-submit"]').should("have.attr", "disabled");

    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello World");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-input-email"]').type("test@test.com");
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").and("not.have.attr", "disabled");

    cy.get('[data-cy="contact-btn-submit"]').click();

    // const btn = cy.get('[data-cy="contact-btn-submit"]');
    // recommended way is to store the value into the alias
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");

    // check if the button is disable
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });
});
