import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../lib/axios";
import MainGraph from "../components/MainGraph";
import TimeAveragedTable from "../components/TimeAveragedTable";
import { BsFillTrash3Fill } from "react-icons/bs";
import CalculationsTab from "../components/CalculationsTab";
import Spinner from "../components/Spinner";
import CalculatedColumnsTable from "../components/CalculatedColumnsTable";

const HomePage = () => {
  const [mainGraphData, setMainGraphData] = useState();
  const [testDataIsLoading, setTestDataIsLoading] = useState(true);
  const [timeAveragedTableData, setTimeAveragedTableData] = useState();
  const [testInfo, setTestInfo] = useState();
  const [testIsSelected, setTestIsSelected] = useState(true);
  const [testExists, setTestExists] = useState(true);
  const [calculatedColumnsTable, setCalculatedColumnsTable] = useState([]);

  const [tabSelection, setTabSelection] = useState(1);

  const { testId } = useParams();

  const navigate = useNavigate();

  const getTestData = async () => {
    try {
      const res = await axios.get("/api/data", { params: { testId: testId } });
      if (res.data.error) {
        setTestExists(false);
        setTestDataIsLoading(false);
        return;
      }
      setTestExists(true);
      setTestInfo(res?.data?.info);
      setMainGraphData(res?.data?.graph);

      const formattedSensorNames = res?.data?.graph?.sensorNames.map((item) => {
        const parts = item.split("/");
        return parseInt(parts[parts.length - 1]);
      });

      setTimeAveragedTableData({
        sensorNames: res?.data?.graph?.sensorNames,
        timeAveragedTable: res?.data?.timeAveragedTable,
      });
      // console.log(res?.data?.graph?.sensorNames);
      setCalculatedColumnsTable(res?.data?.calculatedColumnsTable);
      setTestDataIsLoading(false);
      console.log(res?.data);
    } catch (e) {
      // console.log(e);
    }
  };

  const removeTestById = async (testId) => {
    try {
      const res = await axios.post("/api/data/remove", {
        params: { testId: testId },
      });
      alert("Removed " + testInfo?.setup?.title);
      navigate("/test/");
    } catch (e) {
      if (e.response.status == 400)
        alert("Could not remove " + testInfo?.setup?.title);
    }
    getTestData();
  };

  useEffect(() => {
    if (testId) {
      setTabSelection(1);
      setTestExists(true);
      setTestDataIsLoading(true);
      setTestIsSelected(true);
      getTestData();
    } else {
      setTestIsSelected(false);
      setTestDataIsLoading(false);
    }
  }, [testId]);

  return (
    <div className="">
      {testDataIsLoading && testIsSelected ? (
        <div className="grid h-screen place-items-center mt-[-80px]">
          <Spinner />
        </div>
      ) : (
        <div className="m-0">
          {!testDataIsLoading && testIsSelected && testExists && (
            <>
              <div className="ml-[8px] text-2xl flex m-[5px] my-[10px] font-normal">
                {testInfo?.setup?.title}
                <BsFillTrash3Fill
                  className="cursor-pointer mt-[6.5px] ml-[5px] h-4"
                  onClick={() => removeTestById(testId)}
                />
              </div>
              <div className="h-13 flex bg-gray-300 ">
                <div className="flex-initial">
                  <button
                    className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded w-40 m-1.5 h-auto"
                    onClick={() => {
                      setTabSelection(1);
                    }}
                  >
                    Home
                  </button>
                </div>
                <div className="flex-initial">
                  <button
                    className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded w-40 m-1.5 h-auto"
                    onClick={() => {
                      setTabSelection(2);
                    }}
                  >
                    Calculations
                  </button>
                </div>
              </div>
            </>
          )}
          {tabSelection == 1 && (
            <div className="m-0">
              {!testIsSelected && !testDataIsLoading && (
                <div className="grid h-screen place-items-center mt-[-90px] text-xl font-bold text-gray-500">
                  Please Select a Test
                </div>
              )}
              {!testDataIsLoading && testIsSelected && testExists && (
                <div className="m-0">
                  <div className="m-[8px]">
                    {/* NAME */}

                    {/* TEST INFO */}
                    <div className="flex">
                      <div className="bg-white w-[700px] mr-[7px] border-x-[1px] border-b-[1px] border-t-[5px] border-gray-400">
                        <div className="border-b-[1px] border-gray-400 h-[40px] font-semibold pt-[10px] pl-[10px] text-sm text-gray-800 ">
                          Test Information
                        </div>
                        <div className="p-[10px]">
                          <div className="flex justify-between text-sm pb-[8px] mb-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Operator</div>
                            <div>{testInfo?.details?.operator}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Project Number</div>
                            <div>{testInfo?.details?.projectNo}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Part Number</div>
                            <div>{testInfo?.details?.partNo}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Serial Number</div>
                            <div>{testInfo?.details?.serialNo}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Fluid</div>
                            <div>{testInfo?.details?.fluid}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Fill Ratio</div>
                            <div>{testInfo?.details?.fillRatio}%</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Chiller Temperature</div>
                            <div>{testInfo?.details?.chillerTemp}&#8451;</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Orientation</div>
                            <div>{testInfo?.details?.orientation}&#176;</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Test Designation</div>
                            <div>{testInfo?.details?.testDesignation}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Clamp Pressure or Torque</div>
                            <div>
                              {testInfo?.details?.clampPressureOrTorque} PSI or
                              ft-lb
                            </div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>TIM</div>
                            <div>{testInfo?.details?.tim}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Retest</div>
                            <div>{testInfo?.details?.retest}</div>
                          </div>
                          <div className="flex justify-between text-sm pb-[8px] my-[10px] border-b-[1px] border-gray-300 text-gray-800">
                            <div>Timestamp</div>
                            <div>{testInfo?.details?.timestamp}</div>
                          </div>
                        </div>
                      </div>

                      <MainGraph mainGraphData={mainGraphData} />
                    </div>
                    <CalculatedColumnsTable
                      data={{ timeAveragedTableData, calculatedColumnsTable }}
                    />
                    {/* <TimeAveragedTable data={timeAveragedTableData} /> */}
                  </div>
                </div>
              )}
              {!testExists && testIsSelected && (
                <div>Could not find a testId: {testId} </div>
              )}
            </div>
          )}
          {tabSelection == 2 &&
            !testDataIsLoading &&
            testIsSelected &&
            testExists && (
              <CalculationsTab timeAveragedTableData={timeAveragedTableData} />
            )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
