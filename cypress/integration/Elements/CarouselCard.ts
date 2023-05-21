class CarouselCard {
  private readonly Container: Cypress.Chainable;

  constructor(productId: string) {
    this.Container = cy
      .get(`div[resource_id='${productId}']`)
      .parent()
      .as("container");
  }

  GetContainer = () => {
    return this.Container;
  };

  CardImage = () => {
    return cy.get("@container").find(".v-img__img--cover");
  };

  CardFavoriteIconButton = () => {
    return cy.get("@container").find("div.resource-card__info .favorite-icon");
  };

  TeachersGuideButton = () => {
    return cy
      .get("@container")
      .find(`svg[aria-describedby="Show teacher's material"]`);
  };

  VideoButton = () => {
    return cy
      .get("@container")
      .find("svg[aria-describedby='Show PCP overview']");
  };

  SrcAttribute = () => {
    return this.TeachersGuideButton().invoke("attr", "src");
  };

  ImgSrcAttribute = () => {
    return this.CardImage().invoke("attr", "src");
  };

  ResourceCardContent = () => {
    return cy.get("@container").find(".v-card-text");
  };
}

export default CarouselCard;
