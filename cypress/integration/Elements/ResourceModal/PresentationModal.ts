import ResourceModal from "./ResourceModal";

class PresentationModal extends ResourceModal {
  PresentationsList = () => {
    return this.Container.find(".v-list-item .v-list-item-title");
  };
}

export default PresentationModal;
