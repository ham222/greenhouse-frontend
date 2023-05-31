/// <reference types="cypress" />

describe("presets page", () => {
  beforeEach(() => {
    cy.remock();
    cy.login();
    cy.visit("http://localhost:3000/#/presets");
  });

  it("visits", () => {});

  it("displays all necessary components", () => {
    cy.contains("Create new preset");
    cy.contains("See all presets");
    cy.contains("Save").should("be.visible");
    cy.contains("Update").should("not.exist");
    cy.contains("Apply").should("not.exist");
    cy.contains("Applied").should("not.exist");
    cy.contains("Cancel").should("not.exist");
    cy.getBySel("preset-name");
  });

  it("Clicking save with empty should show error toast", () => {
    cy.contains("Save").click();
    cy.get(`[role=warning-alert]`).should("be.visible");
  });

  it("Shows All Presets when lg breakpoint", () => {
    cy.viewport(1024, 800);
    cy.contains("All Presets");
  });

  it("Does not show All Presets below lg breakpoint", () => {
    cy.viewport(1023, 800);
    cy.contains("All Presets").should("not.be.visible");
  });

  it("Clicking default preset", () => {
    cy.viewport(1024, 800);
    cy.contains("default preset").click();
    cy.contains("Save").should("not.exist");
    cy.contains("Update").should("be.visible");
    cy.contains("Apply").should("not.exist");
    cy.contains("Applied").should("be.visible");
    cy.contains("Cancel").should("not.exist");
  });

  it("Clicking fallback preset", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Save").should("not.exist");
    cy.contains("Update").should("be.visible");
    cy.contains("Apply").should("be.visible");
    cy.contains("Applied").should("not.exist");
    cy.contains("Cancel").should("not.exist");
  });
  it("Click to update fallback preset", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.contains("Save").should("be.visible");
    cy.contains("Update").should("not.exist");
    cy.contains("Apply").should("not.exist");
    cy.contains("Applied").should("not.exist");
    cy.contains("Cancel").should("be.visible");
  });

  it("Click see all presets below lg and go back", () => {
    cy.viewport(1023, 800);
    cy.contains("See all presets").click();
    cy.contains("Go Back").click();
    cy.contains("Save").should("be.visible");
  });

  it("Click see all presets and click fallback preset in modal and has correct values", () => {
    cy.viewport(1023, 800);
    cy.contains("See all presets").click();
    cy.getBySel("preset-item-1").eq(1).click();
    //temp
    cy.getBySel("min-input").eq(0).should("have.value", "25");
    cy.getBySel("max-input").eq(0).should("have.value", "35");
    //humidiy
    cy.getBySel("min-input").eq(1).should("have.value", "30");
    cy.getBySel("max-input").eq(1).should("have.value", "90");
    //co2
    cy.getBySel("min-input").eq(2).should("have.value", "10");
    cy.getBySel("max-input").eq(2).should("have.value", "30");
  });

  it("Update fallback preset changes values", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input")
      .eq(1)
      .clear()
      .type("80")
      .should("have.value", "80");
    cy.contains("Save").click();
    cy.getBySel("max-input").eq(1).should("have.value", "80");
  });

  it("Update fallback preset and canceling resets values", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input")
      .eq(1)
      .clear()
      .type("80")
      .should("have.value", "80");
    cy.contains("Cancel").click();
    cy.getBySel("max-input").eq(1).should("have.value", "90");
  });

  it("Clicking save with already existing name shows error toast", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("preset-name")
      .clear()
      .type("default preset")
      .should("have.value", "default preset");
    cy.contains("Save").click();
    cy.get(`[role=warning-alert]`).should("be.visible");
  });

  it("Clicking save with min bigger than max shows error toast", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input").eq(1).clear().type("0").should("have.value", "0");
    cy.contains("Save").click();
    cy.get(`[role=warning-alert]`).should("be.visible");
  });

  it("Deleting fallback preset removes preset", () => {
    cy.viewport(1024, 800);
    cy.getBySel("delete-preset-button-1").click();
    cy.getBySel("delete-button").click();
    cy.contains("fallback preset").should("not.exist");
  });
  it("Applying fallback preset applies preset", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Apply").click();
    cy.contains("Apply").should("not.exist");
    cy.contains("Applied").should("be.visible");
    cy.contains("default preset").click();
    cy.contains("Apply").should("be.visible");
    cy.contains("Applied").should("not.exist");
  });

  it("Inputing humidity value bigger than max allowed sets it to max", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input")
      .eq(1)
      .clear()
      .type("200")
      .should("have.value", "100");
  });

  it("Inputing co2 value bigger than max allowed sets it to max", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input")
      .eq(2)
      .clear()
      .type("5000")
      .should("have.value", "4095");
  });

  it("Inputing temperature value bigger than max allowed sets it to max", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input")
      .eq(0)
      .clear()
      .type("90")
      .should("have.value", "60");
  });
  it("Writing dash to input field does not add it ", () => {
    cy.viewport(1024, 800);
    cy.contains("fallback preset").click();
    cy.contains("Update").click();
    cy.getBySel("max-input").eq(1).clear().type("-1").should("have.value", "0");
  });
});
