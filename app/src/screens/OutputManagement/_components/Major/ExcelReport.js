import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default (props) => {
    const { dataSet, dataSet2, element } = props;
    return (
        <ExcelFile element={element}>
            <ExcelSheet data={dataSet} name="Output Report">
                <ExcelColumn label="Field" value="field" />
                <ExcelColumn label="Value" value="value" />
            </ExcelSheet>
            <ExcelSheet data={dataSet2} name="Physical Targets">
                <ExcelColumn label="Accomplishment" value="Accomplishment" />
                <ExcelColumn label="Description" value="AccomplishmentDescription" />
                <ExcelColumn label="Planned Target" value="PlannedTarget" />
                <ExcelColumn label="Target Type" value="TargetType" />
                <ExcelColumn label="Target Description" value="TargetDescription" />
            </ExcelSheet>
        </ExcelFile>
    );
}