import DiscardModal from "../Elements/PSIModal/DiscardModal";
import CompleteAssessmentModal from "../Elements/PSIModal/CompleteAssessmentModal";

class PSISummary {
  PSIResults = () => {
    return cy.get(".rows-container .selectable-row");
  };

  DiscardButton = () => {
    return cy.get("#skillScore .v-btn__content").contains("Discard");
  };
  HoldButton = () => {
    return cy.get("#skillScore .v-btn__content").contains("Hold");
  };
  DoneButton = () => {
    return cy.get("#skillScore .v-btn__content").contains("Done");
  };

  ModalNoButton = () => {
    return cy.get(".v-overlay__content .v-btn__content").eq(0);
  };

  ModalDiscardSessionButton = () => {
    return cy.get(".v-overlay__content .v-btn__content").eq(1);
  };

  PacingButton = () => {
    return cy.get(".v-btn-group .v-btn__content").contains("Pacing");
  };

  TrackingSequence = () => {
    return cy.get(".v-btn-group .v-btn__content").contains("Tracking Sequence");
  };

  ConsonantConfusion = () => {
    return cy
      .get(".v-btn-group .v-btn__content")
      .contains("Consonant Confusion");
  };

  NotesInput = () => {
    return cy.get(".v-field__field textarea.v-field__input");
  };

  PlayButton = () => {
    return cy.get(".mdi-play");
  };

  PauseButton = () => {
    return cy.get(".mdi-pause");
  };

  CorrectAnswerButton = () => {
    return cy.get(".mdi-check");
  };

  WrongAnswerButton = () => {
    return cy.get(".mdi-close");
  };

  DiscardModal = () => {
    return new DiscardModal(".v-overlay-container .v-card");
  };

  CompletedAssesmentModal = () => {
    return new CompleteAssessmentModal(".v-overlay-container .v-card");
  };
}

export default PSISummary;
