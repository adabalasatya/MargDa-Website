import { useEffect, useState } from "react";
import { FaEdit, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

const VerifyDataCon = ({ verifyItem, setIsVerifyFormOpen, setDataDetails }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = userData ? userData.user_data.userID : null;
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
    setName(verifyItem.name);
    setEmail(verifyItem.email);
    setMobile(verifyItem.phone);
    setWhatsapp(verifyItem.whatsapp);
  }, []);

  const handleVerify = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/data/verify-data",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataID: verifyItem.dataId,
            name,
            email,
            whatsapp,
            mobile,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const resposneData = data.data;
        setDataDetails((pre) =>
          pre.map((dataItem) =>
            dataItem.dataId && dataItem.dataId === verifyItem.dataId
              ? {
                  ...dataItem,
                  phone: mobile,
                  whatsapp: whatsapp,
                  email: email,
                  dsc: loginUserID,
                  name: name,
                }
              : dataItem
          )
        );
        toast.success(data.message);
        setIsVerifyFormOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/edit-data",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataID: verifyItem.dataId,
            name,
            email,
            whatsapp,
            mobile,
            gender: verifyItem.gender,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const resposneData = data.data;
        setDataDetails((pre) =>
          pre.map((dataItem) =>
            dataItem.dataId && dataItem.dataId === verifyItem.dataId
              ? {
                  ...dataItem,
                  phone: mobile,
                  whatsapp: whatsapp,
                  email: email,
                  name: name,
                }
              : dataItem
          )
        );
        toast.success(data.message);
        setIsVerifyFormOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded shadow-2xl max-w-4xl">
        <div className="flex justify-between p-6 pb-0">
          <h3 className="font-semibold text-2xl text-green-500">
            Verify {name}
          </h3>
          <div>
            <button
              className="hover:text-white hover:bg-black hover:rounded p-1"
              onClick={() => setIsVerifyFormOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 text-xl">
              <div>Name:</div>
              {isEdit ? (
                <div>
                  <input
                    className="border border-gray-300 pl-1 rounded"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              ) : (
                <div>{name}</div>
              )}
            </div>
            <div className="flex gap-5 text-xl items-center">
              <div>Phone:</div>
              {isEdit ? (
                <div>
                  <input
                    className="border border-gray-300 pl-1 rounded"
                    placeholder="Mobile"
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              ) : (
                <div>{mobile}</div>
              )}
              <div className="flex gap-2 ml-auto justify-end items-end">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  SIM
                  <FaPhone />
                </button>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  API
                  <FaPhone />
                </button>
              </div>
            </div>
            <div className="flex gap-5 text-xl items-center">
              <div>WhatsApp:</div>
              {isEdit ? (
                <div>
                  <input
                    className="border border-gray-300 pl-1 rounded"
                    placeholder="Whatsapp"
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              ) : (
                <div>{whatsapp}</div>
              )}
              <div className="flex gap-2 ml-auto justify-end items-end">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Message
                  <IoIosSend />
                </button>
              </div>
            </div>
            <div className="flex gap-5 text-xl items-center">
              <div>Email:</div>
              {isEdit ? (
                <div>
                  <input
                    className="border border-gray-300 pl-1 rounded"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                <div>{email}</div>
              )}

              <div className="flex gap-2 ml-auto justify-end items-end">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Send Email
                  <FaEnvelope />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-4 mt-5">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleVerify}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            >
              Verify
            </button>
            <button
              onClick={() => setIsEdit(true)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            >
              Edit
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDataCon;
