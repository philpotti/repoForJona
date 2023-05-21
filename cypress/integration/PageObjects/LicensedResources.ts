import LicensedResourcesGrid from "../Elements/AGGrid/LicensedResourcesGrid";

class LicensedResources {
  LicensedResourcesGrid = () => {
    return new LicensedResourcesGrid(".ag-root");
  };

  SelectUser = () => {
    return cy.get("span.v-btn__content").contains("Select User");
  };

  LicensedResources = () => {
    return cy.get("span.v-btn__content").contains("Licensed Resources");
  };

  LicensedUsers = () => {
    return cy.get("span.v-btn__content").contains("Licensed Users");
  };
}

export default LicensedResources;
