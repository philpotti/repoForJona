import ResourceModal from "./ResourceModal";

class TeachersGuideModal extends ResourceModal {
  TeachersGuideSection = (sectionName: string) => {
    return cy
      .get("@container")
      .find(`div[id="v-list-group--id-${sectionName}"]`);
  };

  ExpandGuideButton = (sectionName: string) => {
    return this.TeachersGuideSection(sectionName).find(".v-list-item__prepend");
  };

  PdfsLinksContainer = (sectionName: string) => {
    return this.TeachersGuideSection(sectionName).siblings(
      ".v-list-group__items");
    // return cy
    //   .get("@container")
    //   .find(`div[aria-labelledby="v-list-group--id-${sectionName}"]`);
  };
}

export default TeachersGuideModal;
