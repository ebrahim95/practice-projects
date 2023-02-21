/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "super",
      username: "root",
      password: "admin",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("admin");
      cy.contains("login").click();
      cy.contains("super");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("qwerty");
      cy.contains("login").click();

      cy.get(".red")
        .should("contain", "Wrong Credentials")
        .and("have.css", "border-color", "rgb(255, 0, 0)")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When Logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "admin" });
    });

    it("A new blog can be created", function () {
      cy.contains("Add Blog").click();
      cy.get(".title").type("Sample Blog");
      cy.get(".author").type("Superman");
      cy.get(".url").type("google.com");
      cy.get("#blogSubmit").click();

      cy.get(".green").should("contain", "Successfully");
      cy.get(".defaultDetails").should("contain", "Sample Blog");
    });

    describe("and a blog exist", function () {
      beforeEach(function () {
        cy.contains("Add Blog").click();
        cy.createBlog({
          title: "Batman",
          author: "Bane",
          url: "google.com",
        });
      });

      it("user can like a blog", function () {
        cy.contains("View").click();
        cy.get(".handleLikes").should("contain", "Like").click();
        cy.get("#viewDetails").should("contain", "likes: 1");
      });

      it("user can delete a blog", function () {
        cy.contains("View").click();
        cy.visit("http://localhost:3000");
        cy.contains("View").click();
        cy.contains("Batman").parent().find(".removeButton").as("delete");
        cy.get("@delete").click();
        cy.get("html").should("not.contain", "Batman");
      });

      it.only("sorts by highest likes first", function () {
        cy.createBlog({
          title: "Superman",
          author: "Joker",
          url: "google.com",
          likes: 3,
        });

        cy.createBlog({
          title: "Joker",
          author: "Joker",
          url: "google.com",
          likes: 8,
        });

        cy.contains("View").click();
        cy.contains("View").click();
        cy.get(".blogs > div")
          .eq(0)
          .should("not.contain", "likes: 3")
          .and("not.contain", "Superman");
        cy.get(".blogs > div")
          .eq(0)
          .should("contain", "likes: 8")
          .and("contain", "Joker");
        cy.get(".blogs > div")
          .eq(1)
          .should("contain", "likes: 3")
          .and("contain", "Superman");

        cy.contains("View").click();
        cy.get(".blogs > div")
          .eq(2)
          .should("contain", "likes: 0")
          .and("contain", "Batman");
      });
    });
  });
});
