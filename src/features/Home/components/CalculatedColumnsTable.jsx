import React from "react";

const CalculatedColumnsTable = ({ data }) => {
  // console.log(data);
  return (
    <div className=" bg-white border-x-[1px] border-b-[1px] border-t-[5px] border-gray-400 mt-[7px]">
      <div className="border-b-[1px] border-gray-400 h-[40px] font-semibold pt-[10px] pl-[10px] text-sm text-gray-800 ">
        Calculated Columns Table
      </div>
      {data.calculatedColumnsTable?.table?.length != 0 && (
        <div className="p-[7px]">
          <table className="table-fixed text-sm ">
            <thead>
              <tr className="">
                <th className="font-normal px-1">Power</th>
                {data?.calculatedColumnsTable?.calculations?.calculations?.map(
                  (calculation, index) => (
                    <th key={index} className="font-normal px-3">
                      {calculation?.operator}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data?.timeAveragedTableData?.timeAveragedTable?.map(
                (stepObject, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                  >
                    <td className="px-1">{stepObject.powerStepValue}</td>
                    {data?.calculatedColumnsTable?.table?.map((arr, index2) => (
                      <td className="px-3" key={index2}>
                        {Math.round(arr[index])}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalculatedColumnsTable;
