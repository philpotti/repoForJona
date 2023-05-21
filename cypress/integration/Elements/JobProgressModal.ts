import Modal from "./Modal";

class JobProgressModal extends Modal {
  ProgressRate = () => {
    return this.Content().find("p.text-center.mt-5");
  };

  OkButton = () => {
    return this.Actions().contains("Ok");
  };
}

export default JobProgressModal;
