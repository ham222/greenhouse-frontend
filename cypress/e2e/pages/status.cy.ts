/// <reference types="cypress" />

describe("watering page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/#/");
  });

  it("visits", () => {});

  it("should render CurrentValBox", () => {
    cy.intercept("GET", "**").as("get");

    cy.getBySel("current-val-box").should("be.visible");

    cy.wait("@get").then(() => {
      cy.getBySel("current-val-box")
        .invoke("text")
        .then((text) => {
          console.log(text);
        });
    });
  });

  it("should render WateringStatus", () => {
    cy.getBySel("watering-status").should("be.visible");
  });

  it("should render PresetStatus", () => {
    cy.getBySel("preset-status").should("be.visible");
  });

  it("should render LineChart for CO2, Temperature and Humidity", () => {
    cy.getBySel("line-chart-co2").scrollIntoView();
    cy.getBySel("line-chart-co2").should("be.visible");

    cy.getBySel("line-chart-temperature").scrollIntoView();
    cy.getBySel("line-chart-temperature").should("be.visible");

    cy.getBySel("line-chart-humidity").scrollIntoView();
    cy.getBySel("line-chart-humidity").should("be.visible");
  });
});
