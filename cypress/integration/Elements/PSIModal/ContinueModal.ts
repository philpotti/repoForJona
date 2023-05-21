import PSIModal from "../Modal";

class ContinueModal extends PSIModal {
  StopButton = () => {
    return this.Actions().find(".v-btn__content").contains("Stop");
  };
  ContinueButton = () => {
    return this.Actions().find(".v-btn__content").contains("Contuniue");
  };
}
export default ContinueModal;
