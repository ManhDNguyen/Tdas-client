import { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import axios from "../../lib/axios";
import NavLogo from "../../assets/nav_logo_1.png";
import { Button } from "@material-tailwind/react";
import { BsFillCloudUploadFill } from "react-icons/bs";

const Navbar = () => {
  const [list, setList] = useState([]);
  const [listIsLoading, setListIsLoading] = useState(true);

  const { testId } = useParams();

  const getFileList = async () => {
    setListIsLoading(true);
    const testlist = await axios("/api/data/testlist");
    // console.log(testlist);
    setList(testlist.data);
    setListIsLoading(false);
  };

  useEffect(() => {
    getFileList();
  }, [testId]);

  return (
    <>
      {/* Top Nav Container */}
      <div className="h-[48px] bg-[#1e1e1e] flex flex-row justify-between">
        <div className="ml-[9.5px] my-2">
          <Link to={{ pathname: "/test/" }}>
            <img src={NavLogo} className="object-scale-down h-8" />
          </Link>
        </div>
        {/* <div className=" text-white my-auto mr-4">
          <Link to={{ pathname: "/upload" }} className="">
            Upload
          </Link>
        </div> */}
      </div>
      {/* Side Nav and Outlet Container */}
      <div className="flex h-[calc(100vh-48px)]">
        <div className=" bg-white w-[300px] border-r-[1px] border-gray-300">
          <Link to={{ pathname: "/upload" }} className="font-bold">
            <button className="flex justify-center text-black border border-gray-500 font-bold py-[7px] px-4 rounded w-[238px] m-2 mb-0 h-[38px]">
              Upload
              <BsFillCloudUploadFill className="mt-[4px] ml-[10px]" />
            </button>
          </Link>
          <ul className="flex flex-col items-start space-y-3 p-4">
            {/* {listIsLoading ? <li>loading...</li> : <li>All Tests:</li>} */}
            {list.length > 0 ? (
              list?.map((listitem, index) => (
                <li key={index}>
                  <Link
                    to={{ pathname: "/test/" + listitem._id }}
                    className="text-black"
                  >
                    {testId === listitem._id ? (
                      <div className="font-medium text-[#0083e1]">
                        {listitem.setup.title}
                      </div>
                    ) : (
                      <div>{listitem.setup.title}</div>
                    )}
                  </Link>
                </li>
              ))
            ) : (
              <div>no tests</div>
            )}
            <li></li>
          </ul>
        </div>
        <div className="overflow-scroll w-full m-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
