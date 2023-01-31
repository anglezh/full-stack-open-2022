describe("blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create here a user to backend
    const user = {
      username: "songhuajiang",
      password: "shj",
      name: "Jerry",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.get("#username");
    cy.get("#password");
  });
  it("fails with wrong credentials", function () {
    cy.get("#username").type("songhuajiang");
    cy.get("#password").type("sh1j");
    cy.contains("login").click();
    cy.contains("Wrong credentials");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("songhuajiang");
      cy.get("#password").type("shj");
      cy.contains("login").click();
      cy.contains("Jerry logged in");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "songhuajiang", password: "shj" });
        // cy.get('#username').type('songhuajiang')
        // cy.get('#password').type('shj')
        // cy.contains('login').click()
        // cy.contains('Jerry logged in')
      });
      it("A blog can be created", function () {
        cy.contains("new note").click();
        cy.get("#blog-title").type("cypress简介");
        cy.get("#blog-author").type("unkonwn");
        cy.get("#blog-url").type(
          "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes"
        );
        cy.get("#create-blog").click();
        cy.contains("cypress简介 unkonwn");
      });

      describe("when blog created", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "cypress简介",
            author: "un",
            url: "www.eee.com",
          });
          cy.createBlog({
            title: "cypress简介1",
            author: "un1",
            url: "www.eee.com",
          });
          cy.createBlog({
            title: "cypress简介2",
            author: "un2",
            url: "www.eee.com",
          });
        });
        it("like can be click", function () {
          cy.contains("cypress简介 un").contains("view").click();
          cy.contains("cypress简介1 un1").contains("view").click();
          cy.contains("cypress简介2 un2").contains("view").click();
          cy.contains("cypress简介1 un1")
            .parent()
            .find("button")
            .filter(".like-toggle")
            .click();
          // cy.contains('like').click()
        });
        it("blog can deleted", function () {
          cy.contains("cypress简介 un").contains("view").click();
          cy.contains("cypress简介 un")
            .parent()
            .find("button")
            .filter(".remove-blog")
            .click();
        });
      });
      describe("when blog created and likes", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "cypress简介",
            author: "un",
            url: "www.eee.com",
            likes: 5,
          });
          cy.createBlog({
            title: "cypress简介1",
            author: "un1",
            url: "www.eee.com",
            likes: 4,
          });
          cy.createBlog({
            title: "cypress简介2",
            author: "un2",
            url: "www.eee.com",
            likes: 3,
          });
        });
        it("blog for sort", function () {
          cy.get(".blog").eq(1).should("contain", "cypress简介1");

          cy.contains("cypress简介 un").contains("view").click();
          cy.contains("cypress简介1 un1").contains("view").click();
          cy.contains("cypress简介2 un2").contains("view").click();
          cy.contains("cypress简介1 un1")
            .parent()
            .find("button")
            .filter(".like-toggle")
            .click();
          cy.contains("cypress简介1 un1")
            .parent()
            .find("button")
            .filter(".like-toggle")
            .click();

          cy.get(".blog").eq(0).should("contain", "cypress简介1");
        });
      });
    });
  });
});
