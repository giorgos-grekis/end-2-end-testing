describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    // check if we have 6 <li> elements
    cy.get("li").should("have.length", 6);
  });
});
