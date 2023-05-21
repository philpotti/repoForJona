import PSIModal from "../Modal";

class PSIDisclaimnerModal extends PSIModal {
  ConfirmButton = () => {
    return this.Actions().find(".v-btn__content").contains("Ok");
  };
}

export default PSIDisclaimnerModal;
