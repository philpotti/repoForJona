class SettingsEnvironment {
  UseInitialsOption = () => {
    return cy.get(`div[data-cy='environment-setting-avatar_initials']`);
  };

  AllowPhotosOption = () => {
    return cy.get(`div[data-cy='environment-setting-avatar_photos']`);
  };

  AllowRecordOption = () => {
    return cy.get(`div[data-cy='environment-setting-mic_enable']`);
  };

  NotAllowRecordOption = () => {
    return cy.get(`div[data-cy='environment-setting-mic_disable']`);
  };

  InterventionCycleWeeks = () => {
    return cy.get(`div[data-cy='environment-setting-intervention_weeks']`);
  };

  MaxAmountConcurrentGroups = () => {
    return cy.get(`div[data-cy='environment-setting-groups_amount']`);
  };

  MaxAmountStudentsPerGroup = () => {
    return cy.get(`div[data-cy='environment-setting-students_amount']`);
  };

  CancelButton = () => {
    return cy.get(`button[data-cy='environment-setting-cancel_btn']`);
  };

  SaveButton = () => {
    return cy.get(`button[data-cy='environment-setting-save_btn']`);
  };
}

export default SettingsEnvironment;
