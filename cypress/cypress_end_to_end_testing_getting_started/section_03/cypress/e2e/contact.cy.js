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

    // cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").and("not.have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // el is the subject of get()
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.contain("Send Message");
    });

    cy.get('[data-cy="contact-input-email"]').type("test@test.com{enter}");

    // const btn = cy.get('[data-cy="contact-btn-submit"]');
    // recommended way is to store the value into the alias
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");

    // cy.get("@submitBtn").click();

    // check if the button is disable
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");

    cy.get('[data-cy="contact-input-message"]');

    cy.get('[data-cy="contact-input-message"]').blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
