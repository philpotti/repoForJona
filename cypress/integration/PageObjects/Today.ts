import TeachersGuideModal from "../Elements/ResourceModal/TeachersGuideModal";
import VideoModal from "../Elements/ResourceModal/VideoModal";
import CarouselCard from "../Elements/CarouselCard";
import PresentationModal from "../Elements/ResourceModal/PresentationModal";
import StudentCard from "../Elements/StudentCard";

class Today {
  TeacherTipResourceButton() {
    return cy.get(
      ".v-col-8 > .v-row > .v-btn > .v-btn__content > .fp-text--semi-bold"
    );
  }

  //#region Caroussel
  Carousel = () => {
    return cy.get("div.mainContainer .carousel-cards");
  };

  CarouselCards = () => {
    return this.Carousel().find(".v-col");
  };
  //#endregion

  CarouselCard(resourceId: string) {
    return new CarouselCard(resourceId);
  }

  VideoModal = () => {
    return new VideoModal();
  };

  TeachersGuideModal = () => {
    return new TeachersGuideModal();
  };

  PresentationModal = () => {
    return new PresentationModal();
  };

  GetTab = (tabName: string) => {
    return cy.get(`div[data-cy='today-${tabName}']`);
  };

  StudentCard = (name: string, lastname: string) => {
    return new StudentCard(name, lastname);
  };
}

export default Today;
