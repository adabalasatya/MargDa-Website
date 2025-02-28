import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";
import Papa from "papaparse";

const CareerData = () => {
  const [tables, setTables] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const expectedHeaders = ["choiceID", "importance", "zone", "code", "mastID"];

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/career/data/get-tables",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTables(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCSVFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Skip empty lines
        complete: (results) => {
          const { meta } = results;
          const fileHeaders = meta.fields;
          if (JSON.stringify(fileHeaders) !== JSON.stringify(expectedHeaders)) {
            alert(`Invalid columns. Expected: ${expectedHeaders.join(", ")}`);
            return;
          }
          setFile(file);
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (!file || !selectedTable) {
      return toast.error("Select table and csv file");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://margda.in:7000/api/career/data/upload-csv",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="p-16 bg-gray-100 min-h-screen">
      <div className="text-2xl flex items-center gap-3">
        <div>
          <FaChalkboardTeacher />
        </div>
        <div>CAREER DATA</div>
      </div>
      <div className="flex flex-col bg-white p-9 rounded mt-6">
        <div className="flex flex-row justify-around">
          <div>
            <select
              name="select-table"
              id="select-table"
              className="px-3 py-1 border rounded"
              onChange={(e) => setSelectedTable(e.target.value)}
              value={selectedTable}
            >
              <option value="">Select table</option>
              {tables.length > 0 &&
                tables.map((table, index) => (
                  <option value={table.choiceID} key={table.choiceID}>
                    {index + 1}. {table.career_choice}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <input
              type="file"
              name="csv-file"
              id="csv-file"
              accept=".csv"
              onChange={handleCSVFileUpload}
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-blue-500 text-white px-2 py-1 rounded mt-6 ${
              loading ? "bg-gray-400" : ""
            }`}
          >
            {loading ? "Submiting.." : "Submit"}
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CareerData;
