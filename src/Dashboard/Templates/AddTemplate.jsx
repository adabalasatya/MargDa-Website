import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTemplate = () => {
  const [templateType, setTemplateType] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [share, setShare] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isHtmlContent, setIsHtmlContent] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [headerFile, setHeaderFile] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
      if (!templateId.trim()) {
        newErrors.templateId = "Template ID is required";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const userID = localStorage.getItem("userID");
    let payload;
    if (templateType !== "E") {
      payload = {
        templateType,
        templateName,
        share,
        templateId,
        message,
        userID,
      };
    } else {
      payload = {
        templateType,
        templateName,
        share,
        subject,
        message,
        userID,
      };
    }
    if (headerFile) {
      const formData = new FormData();
      formData.append("files", headerFile);
      const upload = await fetch("https://margda.in:7000/api/upload_file", {
        method: "POST",
        body: formData,
      });
      if (upload.ok) {
        const data = await upload.json();
        payload.headerFileUrl = data.fileUrls[0];
      } else {
        throw new Error("File upload failed");
      }
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
        body: formData,
      });
      if (upload.ok) {
        const data = await upload.json();
        payload.templateFileUrls = data.fileUrls;
      } else {
        throw new Error("File upload failed");
      }
    }
    const apiUrl =
      "https://margda.in:7000/api/margda.org/templates/add-template";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
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
    <div className="flex flex-col bg-gray-50  min-h-screen p-2">
      <div className="text-3xl font-blod text-center  font-sans mb-6">Template</div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="template-type" className="font-bold mb-2">
              Template Type
            </label>
            <select
              name="template-type"
              id="template-type"
              onChange={(e) => {
                setTemplateType(e.target.value);
                setErrors({ ...errors, ["templateType"]: "" });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Template Type</option>
              <option value="WS">Scan Whatsapp</option>
              <option value="WA">Whatsapp API</option>
              <option value="E">Email</option>
              <option value="S">SMS</option>
            </select>
            {errors.templateType && (
              <p className="text-red-500 text-sm mt-1">{errors.templateType}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="template-name" className="font-bold mb-2">
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.templateName && (
              <p className="text-red-500 text-sm mt-1">{errors.templateName}</p>
            )}
          </div>
        </div>

        {templateType !== "WS" && (
          <div className="mt-6">
            {templateType === "E" ? (
              <div className="flex flex-col">
                <label htmlFor="template-subject" className="font-bold mb-2">
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                <label htmlFor="template-id" className="font-bold mb-2">
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
                  placeholder="Enter Template ID Here"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.templateId && (
                  <p className="text-red-500 text-sm mt-1">{errors.templateId}</p>
                )}
              </div>
            )}
          </div>
        )}

        {templateType === "WS" && (
          <div className="mt-6">
            <div className="flex flex-col">
              <label
                htmlFor="header"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 text-center"
              >
                {headerFile ? "Change Header File" : "Select Header File"}
              </label>
              {headerFile && (
                <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 mt-3 hover:bg-red-100">
                  <button
                    onClick={handleHeaderFileDelete}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove File"
                  >
                    <span className="text-gray-700">{headerFile.name}</span> ✖
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
                Allowed only .jpg, .png, .jpeg formats
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex flex-col">
            <label htmlFor="template-message" className="font-bold mb-2">
              Message
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarCustomButtons={[
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
            {isHtmlContent && (
              <div className="mt-4">
                <label htmlFor="preview" className="font-bold mb-2">
                  Preview
                </label>
                <div
                  id="preview"
                  className="border border-gray-300 rounded-lg p-4 overflow-auto"
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

        {templateType !== "S" && (
          <div className="mt-6">
            <h1 className="text-lg font-bold mb-4">Attachment</h1>
            {attachmentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-4 border border-gray-300 rounded-lg p-2"
              >
                <input
                  type="file"
                  id={`attachment${index}`}
                  onChange={(e) => handleAttachmentFilesChange(e, index)}
                  className="hidden"
                />
                <label
                  htmlFor={`attachment${index}`}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-pointer hover:bg-gray-500"
                >
                  {file ? "Change File" : `${index + 1}. Choose File`}
                </label>
                {file ? (
                  <button
                    onClick={() => handleRemoveAttachmentFilesInput(index)}
                    className="text-red-600 px-4 hover:bg-gray-200 rounded-lg"
                  >
                    <span className="text-gray-600">{file.name}</span> ✖
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveAttachmentFilesInput(index)}
                    className="text-red-400 hover:text-red-800"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            {attachmentFiles.length < 4 ? (
              <button
                onClick={handleAddAttachmentFilesInput}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                {attachmentFiles.length === 0
                  ? "Add Attachment"
                  : "Add another attachment"}
              </button>
            ) : (
              <div className="text-red-500 mt-4">
                You can add only 4 files
              </div>
            )}
          </div>
        )}

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="share"
            id="share"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
            className="w-5 h-5"
          />
          <label htmlFor="share" className="ml-2 font-bold">
            Share
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <Link
            to="/dashboard/templates-list"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddTemplate;