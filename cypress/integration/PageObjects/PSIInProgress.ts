import PSIDisclaimnerModal from "../Elements/PSIModal/PSIDisclaimerModal";
import ContinueModal from "../Elements/PSIModal/ContinueModal";
import AttentionModal from "../Elements/PSIModal/AttentionModal";
import FinishProcessModal from "../Elements/PSIModal/FinishProcessModal";
import CompleteAssessmentModal from "../Elements/PSIModal/CompleteAssessmentModal";

class PSIInProgress {
  DisclaimerModal = () => {
    return new PSIDisclaimnerModal(".v-overlay-container .v-card");
  };

  ContinueModal = () => {
    return new ContinueModal(".v-card:nth-child(3)");
  };

  AttentionModal = () => {
    return new AttentionModal(".v-overlay-container .v-card");
  };

  FinishProcessModal = () => {
    return new FinishProcessModal(".v-overlay-container .v-card");
  };

  CompleteAssessmentModal = () => {
    return new CompleteAssessmentModal(".v-overlay-container .v-card");
  };

  CorrectAnswerButton = () => {
    return cy.get(".mdi-check");
  };

  WrongAnswerButton = () => {
    return cy.get(".mdi-close");
  };

  MicrophoneButton = () => {
    return cy.get('[class*="microphone"]');
  };

  PacingButton = () => {
    return cy.get(".v-btn-group .v-btn__content").contains("Pacing");
  };

  TrackingSequenceButton = () => {
    return cy.get(".v-btn-group .v-btn__content").contains("Tracking Sequence");
  };

  ConsonantConfusionButton = () => {
    return cy
      .get(".v-btn-group .v-btn__content")
      .contains("Consonant Confusion");
  };

  NotesInput = () => {
    return cy.get("textarea.v-field__input");
  };
}

export default PSIInProgress;
