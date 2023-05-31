/// <reference types="cypress" />

describe("watering on desktop", () => {
  beforeEach(() => {
    cy.login();
    cy.remock();
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

  it("creates a new interval", () => {
    cy.getBySel("water-runtime").should("have.length", 4);
    cy.getBySel("add-button").click();

    cy.get(`[id=headlessui-portal-root]`).contains("W").click();
    cy.get(`[id=headlessui-portal-root]`).contains("Confirm").click();
    cy.getBySel("water-runtime").should("have.length", 5);
  });

  it("deletes an interval", () => {
    cy.getBySel("water-runtime").should("have.length", 4);
    cy.getBySel("water-runtime").eq(3).focus();

    cy.getBySel("3-runtime-delete").click();

    cy.getBySel("water-runtime").should("have.length", 3);
  });
});

describe("watering on mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-se2");
    cy.login();
    cy.remock();
    cy.visit("http://localhost:3000/#/watering");
  });

  it("visits", () => {});

  it("displays all necessary components", () => {
    cy.contains("Watering Schedule");
    cy.getBySel("add-button");
    cy.getBySel("water-toggle");

    cy.getBySel("water-runtime").should("have.length", 1);
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

  it("shows no intervals in a different tab", () => {
    cy.getBySel("add-button-mobile").click();
    cy.contains("Sat").click();
    cy.getBySel("water-runtime").should("have.length", 0);
  });

  it("deletes an interval on a different tab", () => {
    cy.contains("Thu").click();
    cy.getBySel("water-runtime").should("have.length", 1);
    cy.getBySel("water-runtime").eq(0).focus();

    cy.getBySel("3-runtime-delete").click();

    cy.getBySel("water-runtime").should("have.length", 0);
  });
});
