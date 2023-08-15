import React from "react";
import TimeAveragedTable from "./TimeAveragedTable";
import CustomCalculationsTool from "./CustomCalculationsTool";

const CalculationsTab = (props) => {
  return (
    <>
      <div className="m-[8px] bg-white border-x-[1px] border-b-[1px] border-t-[5px] border-gray-400">
        <div className="border-b-[1px] border-gray-400 h-[40px] font-semibold pt-[10px] pl-[10px] text-sm text-gray-800 ">
          Time Averaged Table
        </div>
        <TimeAveragedTable data={props.timeAveragedTableData} />
      </div>
      <CustomCalculationsTool data={props.timeAveragedTableData} />
    </>
  );
};

export default CalculationsTab;
