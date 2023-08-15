import { useState, useEffect } from "react";
import { Select, Option, Checkbox, Button } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import axios from "../../../lib/axios";

const CustomCalculationsTool = (props) => {
  const { testId } = useParams();
  const [calculations, setCalculations] = useState([]);

  const getCalculations = async () => {
    try {
      const res = await axios.get("api/data/calc", {
        params: { testId: testId },
      });
      console.log(res.data);
      setCalculations(res.data.calculations);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getCalculations();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.post("api/data/calc", {
        testId: testId,
        calculations: calculations,
      });
      console.log(res);
    } catch (e) {
      // console.log(e);
    }
  };

  const handleSelectUpdate = (id, newOperator) => {
    setCalculations((prevCalculations) => {
      return prevCalculations.map((calculation) => {
        if (calculation.id === id) {
          return {
            ...calculation,
            operator: newOperator,
          };
        }
        return calculation;
      });
    });
  };

  const handleCheckboxUpdate = (id, value, checked) => {
    setCalculations((prevCalculations) => {
      return prevCalculations.map((calculation) => {
        if (calculation.id === id) {
          return {
            ...calculation,
            columns: checked
              ? [...calculation.columns, value]
              : calculation.columns.filter((column) => column !== value),
          };
        }
        return calculation;
      });
    });
  };

  const removeCalculation = (calculationId) => {
    setCalculations(calculations.filter((calc) => calc.id !== calculationId));
  };

  const handleAddCalc = () => {
    console.log("here");
    const newCalculation = {
      id: uuidv4(),
      columns: [],
      operator: "max",
    };

    setCalculations([...calculations, newCalculation]);
  };

  return (
    <div className="m-[7px] bg-white border-x-[1px] border-b-[1px] border-t-[5px] border-gray-400 mt-[7px]">
      <div className="border-b-[1px] border-gray-400 h-[40px] font-semibold pt-[10px] pl-[10px] text-sm text-gray-800 ">
        Custom Calculations
      </div>
      <div className="p-[7px]">
        <div className="text-sm p-[4px]">
          {calculations.map((calculation, index) => (
            <div key={index}>
              <div className="w-72">
                <Select
                  value={calculation.operator}
                  label="Select Operation"
                  onChange={(value) =>
                    handleSelectUpdate(calculation.id, value)
                  }
                >
                  <Option value="max">Maximum</Option>
                  <Option value="min">Minimum</Option>
                  <Option value="avg">Average</Option>
                  <Option value="dif">Difference</Option>
                </Select>
              </div>
              <div className="flex flex-wrap gap-0">
                {props.data.sensorNames.map((sensorName, index) => (
                  <Checkbox
                    checked={calculation.columns.some((str) =>
                      str.includes(sensorName)
                    )}
                    key={index}
                    label={sensorName.slice(-3)}
                    value={sensorName}
                    onChange={(event) =>
                      handleCheckboxUpdate(
                        calculation.id,
                        event.target.value,
                        event.target.checked
                      )
                    }
                  />
                ))}
              </div>
              <div onClick={() => removeCalculation(calculation.id)}>
                <IoMdRemoveCircleOutline />
              </div>
              <br />
            </div>
          ))}
          <Button onClick={handleAddCalc} size="sm">
            New
          </Button>
          <br />
          <br />
          <Button onClick={handleSave} size="sm">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCalculationsTool;
