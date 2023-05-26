/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/login");
  });

  it("visits", () => {});

  it("displays elements", () => {
    cy.contains("h2", "Sign in to your account");
    cy.contains("label", "Email address");
    cy.contains("label", "Password");
    cy.contains("button", "Sign in");
  });

  const invalid = [
    { email: "", password: "" },
    { email: "email", password: "password" },
    { email: "email@email.com", password: "" },
    { email: "", password: "password" },
  ];

  invalid.forEach((data) => {
    const { email, password } = data;

    it(`does not log in when fields are invalid:  ${email} and  ${password}`, () => {
      cy.intercept("POST", "**").as("postLogin");
      if (email !== "") cy.get('input[name="email"]').type(email);
      if (password !== "") cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      //Test whether test stays on login page
      cy.url().should("include", "/login");
    });
  });

  it("logs in", () => {
    const email = "example@email.com";
    const password = "random_passw0rd$#";

    cy.intercept("POST", "**").as("postLogin");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait("@postLogin").then((interception) => {
      expect(interception)
        .to.have.property("request")
        .and.have.property("method", "POST");
      expect(interception.request.body).to.include({
        email: email,
        password: password,
      });
    });
  });
});
