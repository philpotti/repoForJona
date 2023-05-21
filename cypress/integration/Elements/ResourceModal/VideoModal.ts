import ResourceModal from "./ResourceModal";

class VideoModal extends ResourceModal {
  Iframe = () => {
    return this.Container.find("iframe[allow='encrypted-media']").then(cy.wrap);
  };
}

export default VideoModal;
