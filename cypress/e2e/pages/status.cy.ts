/// <reference types="cypress" />

describe("watering page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/#/");
  });

  it("visits", () => {});

  it("renders CurrentValBox", () => {
    cy.getBySel("current-val-box").should("be.visible");
  });

  it("renders WateringStatus", () => {
    cy.getBySel("watering-status").should("be.visible");
  });

  it("renders PresetStatus", () => {
    cy.getBySel("preset-status").should("be.visible");
  });

  it("renders LineChart for CO2, Temperature and Humidity", () => {
    cy.getBySel("line-chart-co2").scrollIntoView();
    cy.getBySel("line-chart-co2").should("be.visible");

    cy.getBySel("line-chart-temperature").scrollIntoView();
    cy.getBySel("line-chart-temperature").should("be.visible");

    cy.getBySel("line-chart-humidity").scrollIntoView();
    cy.getBySel("line-chart-humidity").should("be.visible");
  });

  it("navigates to watering when WateringStatus clicked", () => {
    cy.getBySel("watering-status").click();
    cy.url().should("include", "/watering");
  });

  it("navigates to presets when PresetStatus clicked", () => {
    cy.getBySel("preset-status").click();
    cy.url().should("include", "/presets");
  });

  it("navigates to presets when PresetStatus clicked", () => {
    cy.getBySel("preset-status").click();
    cy.url().should("include", "/presets");
  });

  it("displayes current data after loading", () => {
    cy.containsSel("current-humidity", /\d+%/);

    cy.containsSel("current-co2", /\d+ ppm/);

    cy.containsSel("current-temperature", /\d+(?:.\d+)?°C/);

    cy.containsSel("current-watering-status", /Water System: (ON|OFF)/);
  });
});
