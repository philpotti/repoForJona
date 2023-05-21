import Table from "./Table";

class StudentDetailsTable extends Table {
  HeadersTitles = () => {
    return this.Headers().find("th.sue-light-purple-background");
  };

  SkillDescription = () => {
    return this.Headers().find("th p.vertical-header");
  };

  AssessmentClosed = (row: number) => {
    return this.Rows().eq(row).find("td:nth-child(13)");
  };

  AssessmentActions = (row: number) => {
    return this.Rows().eq(row).find("td button");
  };

  AssessmentTakenForm = (row: number) => {
    return this.Rows().eq(row).find("td.first-fixed-column");
  };

  AssessmentTakenBy = (row: number) => {
    return this.Rows().eq(row).find("td.second-fixed-column");
  };

  AssesmentTakenDate = (row: number) => {
    return this.Rows().eq(row).find("td.third-fixed-column");
  };

  GetColumnIndex = (columnName: string) => {
    return this.HeadersTitles()
      .contains(columnName)
      .then(($header) => {
        return $header.index();
      });
  };

  GetCellByColumnName(row: number, columnName: string) {
    let columnsToIgnore = 3;
    return this.GetColumnIndex(columnName).then((columnIndex) => {
      return this.GetCellByColumnIndex(row, columnIndex, columnsToIgnore);
    });
  }
}

export default StudentDetailsTable;
