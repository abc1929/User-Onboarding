/* eslint-disable no-undef */

// write tests here

describe("Onboarding App", () => {
   beforeEach(() => {
      console.log("Ayy test");
      cy.visit("http://localhost:3000");
   });

   const getInputField = (name) => {
      return cy.get("Input[name='" + name + "']");
   };

   const testNameInput = () => {
      getInputField("name").type("TestName");
      getInputField("name").type("{selectall}{backspace}");
      cy.contains("Name is required");
      getInputField("name").type("TestName");
      getInputField("name").should("have.value", "TestName");
   };

   const testEmailInput = () => {
      getInputField("email").type("TestEmail");
      cy.contains("Must be a valid email");
      getInputField("email").type("{selectall}{backspace}");
      cy.contains("Email is required");
      getInputField("email").type("TestEmail@test.com");
      getInputField("email").should("have.value", "TestEmail@test.com");
   };

   const testPasswordInput = () => {
      getInputField("password").type("Test");
      cy.contains("Your Password should be at least 6 characters");
      getInputField("password").type("{selectall}{backspace}");
      // cy.contains("Password is required");

      getInputField("password").type("TestPassword");
      getInputField("password").should("have.value", "TestPassword");
      getInputField("password").should("have.attr", "type", "password");
      getInputField("password").next().click();
      getInputField("password").should("have.attr", "type", "text");
      getInputField("password").should("have.value", "TestPassword");
   };

   const testRoleSelection = () => {
      const sel = cy.get("select");
      sel.select("Backend");
      sel.select("");
      cy.contains("You need to pick a role");
      // there's a bug here you can't use sel directly?
      cy.get("select").select("Frontend");
      sel.select("DevOps");
      sel.should("have.value", "devops");
   };

   const testCheckbox = () => {
      const box = cy.get("*[name='agreed']");
      box.focus();
      cy.focused().click({ force: true });
      cy.focused().next().should("have.attr", "data-checked"); // this is ChakraUI specific, checking whether the box is ticked
      cy.focused().click({ force: true });
      cy.contains("You must accept the TOS");
      cy.focused().click({ force: true });
      // box.click();
   };

   it("Sanity Checks", () => {
      cy.contains("User List");
      cy.contains("Select position");
   });

   it("Name typing test", () => {
      testNameInput();
   });

   it("Email typing test", () => {
      testEmailInput();
   });

   it("Password typing test", () => {
      testPasswordInput();
   });

   it("Role select test", () => {
      testRoleSelection();
   });

   it("Checkbox test", () => {
      testCheckbox();
   });

   it("Submit test", () => {
      testNameInput();
      testEmailInput();
      testPasswordInput();
      testRoleSelection();
      testCheckbox();
      cy.contains("Submit").click();
      cy.get(".userlist").contains("TestName");
   });
});
