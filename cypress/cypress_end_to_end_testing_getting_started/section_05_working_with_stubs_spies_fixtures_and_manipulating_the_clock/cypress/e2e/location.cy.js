/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    // This is how then works when used after visit.
    // Visit yields the window object of the site that's visited just as get yields the element that we got when using then().
    cy.visit("/").then((win) => {
      // stub: takes two arguments
      // the first argument points at the object that contains the method you want to replace (window.navigator.geolocation)
      // the second argument is the name if the method you want to replace as a string
      cy.stub(win.navigator.geolocation, "getCurrentPosition")
        .as("getUserPosition")
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords: {
                latitude: 37.5,
                longitude: 48.01,
              },
            });
          }, 100);
        });
    });
  });

  it("should fetch the user location", () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getUserPosition").should("have.been.called");
    // the button is disabled
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");

    cy.get('[data-cy="actions"]').should("contain", "Location fetched!");
  });

  it("should share a location URL", () => {
    cy.get('[data-cy="name-input"]').type("John Doe");
    cy.get('[data-cy="get-loc-btn"]').click();
  });
});
