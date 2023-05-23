/// <reference types="cypress" />

describe("watering on desktop", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/watering");
  });

  it("visits", () => {});

  it("displays all necessary components", () => {
    cy.contains("Watering Schedule");
    cy.getBySel("add-button");
    cy.getBySel("water-toggle");

    cy.getBySel("water-runtime").should("have.length", 4);
  });

  it("chooses manual watering duration and cancels", () => {
    cy.getBySel("water-toggle").click();

    cy.getBySel("watering-modal")
      .find('input[type="number"]')
      .should("have.value", 5);

    cy.getBySel("watering-modal")
      .find('input[type="number"]')
      .type("{backspace}{moveToEnd}10");

    cy.getBySel("watering-modal")
      .find('input[type="number"]')
      .should("have.value", 10);

    cy.getBySel("watering-modal").contains("Cancel").click();
  });

  it("runs watering for 50 minutes", () => {
    cy.intercept("GET", "**/watering-system/toggle").as("getToggle");

    cy.getBySel("water-toggle").click();

    cy.wait("@getToggle").then((interception) => {
      expect(interception)
        .to.have.property("request")
        .and.have.property("method", "GET");
    });

    cy.getBySel("watering-modal")
      .find('input[type="number"]')
      .should("have.value", 5);

    cy.getBySel("watering-modal").find('input[type="number"]').type("0");

    cy.getBySel("watering-modal")
      .find('input[type="number"]')
      .should("have.value", 50);

    cy.intercept("POST", "**/watering-system/toggle", {}).as("postToggle");

    cy.getBySel("watering-modal").contains("Confirm").click();

    cy.wait("@postToggle").then((interception) => {
      expect(interception)
        .to.have.property("request")
        .and.have.property("method", "POST");

      expect(interception.request.body).to.have.property("duration");
    });
  });
});
