import PSIModal from "../Modal";

class CompleteAssessmentModal extends PSIModal {
  OkButton = () => {
    return this.Actions().contains("Ok");
  };
}

export default CompleteAssessmentModal;
