import StudentDetailsTable from "../Elements/Table/StudentDetailsTable";

class StudentDetails {
  StudentDetailsTable = () => {
    return new StudentDetailsTable("table.table");
  };

  ScheduledAssessmentAlert = () => {
    return cy.get(".v-alert");
  };

  ConfirmButton = () => {
    return cy.get(`button[data-cy='student-details-start_btn']`);
  };

  ExitButton = () => {
    return cy.get(`button[data-cy='student-details-exit_btn']`);
  };
}

export default StudentDetails;
