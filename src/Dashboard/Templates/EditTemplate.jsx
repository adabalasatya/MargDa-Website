import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
} from "draft-js";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditTemplate = () => {
  const location = useLocation();
  const { tempID } = location.state || {};
  const [templateType, setTemplateType] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [share, setShare] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isHtmlContent, setIsHtmlContent] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [headerFile, setHeaderFile] = useState(null);
  const [headerUrl, setHeaderUrl] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    fetchTemplateData();
  }, []);
  const fetchTemplateData = async () => {
    if (!tempID) {
      alert("Failed to fetch template data");
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-template-with-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tempID,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const template = data.Template[0];
        setTemplateType(template.temptype.trim());
        setSubject(template.subject);
        setTemplateName(template.template);
        setTemplateId(template.auth);
        setMessage(template.matter);
        setShare(template.share);
        const contentState = ContentState.createFromText(template.matter);
        setEditorState(EditorState.createWithContent(contentState));
        setHeaderUrl(template.bimg_url);
        setAttachmentUrls(template.attach_url);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const onEditorStateChange = (state) => {
    setEditorState(state);
    const text = state.getCurrentContent().getPlainText();
    setMessage(text);
    setErrors({ ...errors, ["message"]: "" });
  };

  const onHandleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 4));
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  const handleHeaderFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHeaderFile(file);
    }
  };

  const handleHeaderFileDelete = () => {
    setHeaderFile(null);
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!templateType.trim()) {
      newErrors.templateType = "Template type is required.";
    }
    if (!templateName.trim()) {
      newErrors.templateName = "Template Name is required.";
    }
    if (!message) {
      newErrors.message = "Message is required";
    }
    if (templateType === "E") {
      if (!subject.trim()) {
        newErrors.subject = "Subject is required";
      }
    } else if (templateType === "WA" || templateType === "S") {
      if (!templateId || !templateId.trim()) {
        newErrors.templateId = "Template ID is required";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    let payload;
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    if (templateType !== "E") {
      payload = {
        tempID,
        templateType,
        templateName,
        share,
        templateId,
        message,
      };
    } else {
      payload = {
        tempID,
        templateType,
        templateName,
        share,
        subject,
        message,
      };
    }
    if (headerFile) {
      const formData = new FormData();
      formData.append("files", headerFile);
      const upload = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (upload.ok) {
        const data = await upload.json();
        payload.headerFileUrl = data.fileUrls[0];
      } else {
        throw new Error("File upload failed");
      }
    } else if (headerUrl) {
      payload.headerFileUrl = headerUrl;
    }
    if (attachmentFiles.length > 0) {
      const formData = new FormData();
      attachmentFiles.forEach((file) => {
        if (file) {
          formData.append("files", file);
        }
      });
      const upload = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (upload.ok) {
        const data = await upload.json();
        payload.templateFileUrls = data.fileUrls;
      } else {
        throw new Error("File upload failed");
      }
    } else if (attachmentUrls && attachmentUrls.length > 0) {
      payload.templateFileUrls = attachmentUrls;
    }
    const apiUrl =
      "https://margda.in:7000/api/margda.org/templates/edit-template";
    try {
      const response = await fetch(apiUrl, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        return toast.success(data.message);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }
  };

  const handleHtmlChange = (e) => {
    setIsHtmlContent(e.target.checked);
  };

  const handleAttachmentFilesChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFiles = [...attachmentFiles];
      updatedFiles[index] = file; // Update the specific index with the selected file
      setAttachmentFiles(updatedFiles);
    }
  };

  const handleAddAttachmentFilesInput = () => {
    setAttachmentFiles([...attachmentFiles, null]); // Add a placeholder for a new file
  };

  const handleRemoveAttachmentFilesInput = (index) => {
    const updatedFiles = attachmentFiles.filter((_, i) => i !== index);
    setAttachmentFiles(updatedFiles);
  };

  return (
    <div className="flex flex-col bg-gray-100 justify-start items-start p-2">
      <div className="text-3xl font-light font-sans mt-4">Template</div>
      <div
        className="bg-white self-center justify-between flex flex-col p-4 mt-4 rounded border"
        style={{ minWidth: "98%" }}
      >
        <div className="flex flex-row text-base font-normal justify-between w-full">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="template-type" className="font-bold p-1">
              Template Type
            </label>
            <select
              disabled
              name="template-type"
              id="template-type"
              value={templateType}
              onChange={(e) => {
                setTemplateType(e.target.value);

                setErrors({ ...errors, ["templateType"]: "" });
              }}
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            >
              <option value="">Select Template Type</option>
              <option value="WS">Scan Whatsapp</option>
              <option value="WA">Whatsapp APi</option>
              <option value="E">Email</option>
              <option value="S">Sms</option>
            </select>
            {errors.templateType && (
              <p className="text-red-500 text-sm mt-1">{errors.templateType}</p>
            )}
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="template-name" className="font-bold p-1">
              Template Name
            </label>
            <input
              type="text"
              name="template-name"
              id="template-name"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
                setErrors({ ...errors, ["templateName"]: "" });
              }}
              placeholder="Enter Template Name Here"
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            />
            {errors.templateName && (
              <p className="text-red-500 text-sm mt-1">{errors.templateName}</p>
            )}
          </div>
        </div>
        {templateType !== "WS" && (
          <div className="flex flex-row text-base font-normal justify-between w-1/2 mt-4">
            {templateType === "E" ? (
              <div className="flex flex-col items-start w-full">
                <label htmlFor="template-id" className="font-bold p-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="template-subject"
                  id="template-subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setErrors({ ...errors, ["subject"]: "" });
                  }}
                  placeholder="Enter Subject Here"
                  className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-start w-full">
                <label htmlFor="template-id" className="font-bold p-1">
                  Template ID
                </label>
                <input
                  type="text"
                  name="template-id"
                  id="template-id"
                  value={templateId}
                  onChange={(e) => {
                    setTemplateId(e.target.value);

                    setErrors({ ...errors, ["templateId"]: "" });
                  }}
                  placeholder="Enter Template id Here"
                  className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                />
                {errors.templateId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.templateId}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {templateType === "WS" && (
          <div className="flex flex-row text-base font-normal justify-between w-1/2 mt-4">
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor="header"
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
              >
                {headerUrl || headerFile
                  ? "Change Header File"
                  : "Select Header File"}
              </label>
              {headerFile && (
                <div className="flex items-center justify-between border border-gray-300 rounded p-2 mt-3 hover:bg-red-300">
                  <button
                    onClick={handleHeaderFileDelete}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove File"
                  >
                    <span className="text-gray-700">{headerFile.name}</span>✖
                  </button>
                </div>
              )}
              <input
                type="file"
                name="header"
                className="hidden"
                id="header"
                onChange={handleHeaderFileChange}
                accept="image/*"
              />
              <div className="text-red-500 mt-3">
                Allowed only .jpg, .png,.jpeg formats
              </div>
            </div>
          </div>
        )}
        {headerUrl && !headerFile && (
          <a href={headerUrl} className="w-max" target="_blank">
            <div className="flex items-start justify-start border border-gray-300 rounded p-2 mt-3 text-base font-normal w-full">
              {"Header File"}
            </div>
          </a>
        )}
        <div className="mt-6">
          <div className="flex flex-col">
            <label
              htmlFor="template-message"
              className="text-base font-normal p-1"
            >
              Message
            </label>
            {templateType == "S" ? (
              <div>
                <textarea
                  name="message"
                  id="template-message"
                  placeholder="Message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    const newText = e.target.value;

                    if (newText.length > 125) {
                      toast.warn("SMS Can't be greater than 125 letters");
                      return; // Prevent updating the state if limit exceeded
                    }

                    setMessage(newText); // Update state normally if within limit
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch-html"
                  checked={isHtmlContent}
                  className="w-5 h-5 hidden"
                  onChange={handleHtmlChange}
                />
                <div className="border border-gray-300 rounded p-3 h-[300px]  overflow-y-auto">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    toolbarCustomButtons={[
                      // eslint-disable-next-line react/jsx-key
                      <label
                        htmlFor="switch-html"
                        className={`text-base font-normal p-1 ${
                          isHtmlContent ? "border bg-gray-100" : ""
                        }`}
                      >
                        Source
                      </label>,
                    ]}
                    onEditorStateChange={onEditorStateChange}
                    onTab={onHandleKeyBindings}
                  />
                </div>
              </div>
            )}

            <div className="justify-end flex text-sm mr-3 mt-3">
              Length: {message.length}
            </div>
            {isHtmlContent && (
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="preview" className="text-base font-normal p-1">
                  Preview
                </label>
                <div
                  id="preview"
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginTop: "10px",
                    overflowX: "scroll",
                    maxHeight: "400px",
                    overflowY: "scroll",
                  }}
                  className="w-full p-2 mb-4 border-gray-300 flex flex-col items-start"
                  dangerouslySetInnerHTML={{
                    __html: message ? message : "Preview Will be Show Here",
                  }}
                />
              </div>
            )}
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
        </div>

        {templateType && templateType.trim() !== "S" && (
          <div>
            <div className="flex flex-col text-base font-bold justify-between items-start w-[90%] mt-6">
              <h1 className="text-lg font-bold mt-6">
                {attachmentUrls ? "Change Attachments" : "Attachment"}
              </h1>
              {attachmentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 mt-6 border px-4 py-1 pl-1"
                >
                  <input
                    type="file"
                    id={`attachmet${index}`}
                    onChange={(e) => handleAttachmentFilesChange(e, index)}
                    className="hidden"
                  />

                  <label
                    htmlFor={`attachmet${index}`}
                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer hover:bg-gray-500"
                  >
                    {file ? "Change File" : `${index + 1}. Choose File`}
                  </label>
                  {file ? (
                    <button
                      onClick={() => handleRemoveAttachmentFilesInput(index)}
                      className="text-red-600 px-4 hover:bg-gray-300 rounded"
                    >
                      <span className="text-gray-600 ">{file.name} </span>
                      <sup>X</sup>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveAttachmentFilesInput(index)}
                      className="text-red-400 hover:text-red-800"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              {attachmentFiles.length < 4 ? (
                <button
                  onClick={handleAddAttachmentFilesInput}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mt-6"
                >
                  {attachmentFiles.length === 0
                    ? "Add Attachment"
                    : "Add another attachment"}
                </button>
              ) : (
                <div className="text-base font-normal text-red-500 mt-6">
                  You can add only 4 files
                </div>
              )}
            </div>
            {attachmentUrls &&
              attachmentUrls.length > 0 &&
              !attachmentFiles.length > 0 &&
              attachmentUrls.map((url, index) => (
                <a href={url} className="w-max" target="_blank">
                  <div className="flex items-start justify-start border border-gray-300 rounded p-2 mt-3 text-base font-normal w-full">
                    {`${index + 1}. Attachment`}
                  </div>
                </a>
              ))}
          </div>
        )}

        <div className="flex flex-row mt-4 items-center ">
          <div className="flex">
            <input
              type="checkbox"
              name=""
              id="share"
              checked={share}
              className="w-5 h-5"
              onChange={(e) => {
                setShare(e.target.checked);
              }}
            />
          </div>
          <div className="">
            <label htmlFor="share" className="ml-4  font-normal">
              Share
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-3 my-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
          >
            Submit
          </button>
          <Link
            to={"/templates-list"}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
