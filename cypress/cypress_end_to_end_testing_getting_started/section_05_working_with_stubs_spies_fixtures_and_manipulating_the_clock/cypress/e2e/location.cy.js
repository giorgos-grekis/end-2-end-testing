/// <reference types="cypress" />

describe("share location", () => {
  it("should fetch the user location", () => {
    // This is how then works when used after visit.
    // Visit yields the window object of the site that's visited just as get yields the element that we got when using then().
    cy.visit("/").then((win) => {
      // stub: takes two arguments
      // the first argument points at the object that contains the method you want to replace (window.navigator.geolocation)
      // the second argument is the name if the method you want to replace as a string
      cy.stub(win.navigator.geolocation, "getCurrentPosition").as("getUserPosition");
    });

    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getUserPosition").should("have.been.called");
  });
});
