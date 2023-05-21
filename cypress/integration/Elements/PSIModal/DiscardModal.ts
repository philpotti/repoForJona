import PSIModal from "../Modal";

class DiscardModal extends PSIModal {
  CancelButton = () => {
    return this.Actions().find(".v-btn__content").contains("No");
  };

  ConfirmButton = () => {
    return this.Actions()
      .find(".v-btn__content")
      .contains("Ok, discard session");
  };
}

export default DiscardModal;
