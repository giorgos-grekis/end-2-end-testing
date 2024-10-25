/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.fixture("user-location.json").as("userLocation");

    // This is how then works when used after visit.
    // Visit yields the window object of the site that's visited just as get yields the element that we got when using then().
    cy.visit("/").then((win) => {
      cy.get("@userLocation").then((fakePosition) => {
        // stub: takes two arguments
        // the first argument points at the object that contains the method you want to replace (window.navigator.geolocation)
        // the second argument is the name if the method you want to replace as a string
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getUserPosition")
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });

      cy.stub(win.navigator.clipboard, "writeText").as("saveToClickBoard").resolves();
      cy.spy(win.localStorage, "setItem").as("storeLocation");
      cy.spy(win.localStorage, "getItem").as("getStoredLocation");
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
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClickBoard").should("have.been.called");
    cy.get("@userLocation").then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get("@saveToClickBoard").should("have.been.calledWithMatch", new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`));
      cy.get("@storeLocation").should("have.been.calledWithMatch", /John Doe/, new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`));
    });

    cy.get("@storeLocation").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@getStoredLocation").should("have.been.called");
  });
});
