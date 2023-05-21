import PSIModal from "../Modal";

class AttentionModal extends PSIModal {
  StopButton = () => {
    return this.Actions().find(".v-btn__content").contains("Stop");
  };

  ContinueButton = () => {
    return this.Actions().find(".v-btn__content").contains("Continue");
  };
}

export default AttentionModal;
