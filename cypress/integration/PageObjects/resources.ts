import CarouselCard from "../Elements/CarouselCard";
import VideoModal from "../Elements/ResourceModal/VideoModal";
import TeachersGuideModal from "../Elements/ResourceModal/TeachersGuideModal";
import WishlistModal from "../Elements/WishlistModal";
import PresentationModal from "../Elements/ResourceModal/PresentationModal";

class Resources {
  Carousel = () => {
    return cy.get("div.carousel-cards");
  };

  CarouselCards = () => {
    return this.Carousel().find(".v-card");
  };

  //#endregion
  resourceCard(cardPosition: number) {
    return cy.get(
      `.resources-grid div[data-cy='grid-resource-card-${cardPosition}']`
    );
  }

  CarouselCard(resourceId: string) {
    return new CarouselCard(resourceId);
  }
  VideoModal = () => {
    return new VideoModal();
  };

  TeachersGuideModal = () => {
    return new TeachersGuideModal();
  };

  WishlistModal = () => {
    return new WishlistModal();
  };

  PresentationModal = () => {
    return new PresentationModal();
  };
}

export default Resources;
