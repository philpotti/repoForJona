import PSIModal from "../Modal";

class FinishProcessModal extends PSIModal {
  CancelButton = () => {
    return this.Actions().contains("Cancel");
  };
  ConfirmButton = () => {
    return this.Actions().contains("Confirm");
  };
}
export default FinishProcessModal;
