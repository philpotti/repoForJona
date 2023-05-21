class StudentCard {
  private Container: Cypress.Chainable;

  constructor(name: string, lastname: string) {
    let locator = "div.student-cards-grid div.v-card";
    let offset = 1;
    let index = -1;

    this.Container = cy
      .get(locator)
      .each(($card, cardIndex) => {
        cy.wrap($card)
          .find("div.student-info p:nth-child(1)")
          .then(($studentName) => {
            if ($studentName.text() === name) {
              cy.wrap($card)
                .find("div.student-info p:nth-child(2)")
                .then(($studentLastName) => {
                  if ($studentLastName.text() === lastname) {
                    index = cardIndex;
                    return false;
                  }
                });
            }
          });
      })
      .then(() => {
        if (index !== -1) {
          return cy
            .get(`${locator}:nth-child(${index + offset})`)
            .as("container");
        }
      });
  }

  CardContainer = () => {
    return this.Container;
  };

  CardGroup = () => {
    return cy.get("@container").find(".group");
  };

  StudentInfo = () => {
    return cy.get("@container").find(".student-info");
  };

  StudentName = () => {
    return this.StudentInfo().find("p:nth-child(1)");
  };

  StudentLastname = () => {
    return this.StudentInfo().find("p:nth-child(2)");
  };

  StudentFullName = () => {
    let fullName: string = "";

    this.StudentName().then((name) => {
      fullName = name.text();
    });

    this.StudentLastname().then(($element) => {
      fullName += ` ${$element.text()}`;
    });

    return fullName;
  };
}
export default StudentCard;
