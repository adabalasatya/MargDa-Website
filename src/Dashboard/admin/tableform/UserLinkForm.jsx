import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaCalendarAlt,
  FaTrash,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

const UserLinkForm = ({ user, onClose }) => {
  const [selectedLinks, setSelectedLinks] = useState(new Set());
  const [validUpto, setValidUpto] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [savedLinks, setSavedLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 25;

  const userData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userData ? userData.access_token : null;

  const formatDate = (date) => {
    const obj = new Date(date);
    const dat = obj.getDate();
    const month = obj.getMonth();
    const year = obj.getFullYear();
    return `${dat}-${Number(month) + 1}-${year}`;
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await fetch(
        "https://margda.in:7000/api/master/link/get-links",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: user.userID }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const links = result.data;
        setSavedLinks(links);
      } else {
        setSavedLinks([]); // If Institutes is not an array or doesn't exist, set to empty array
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const linkCategories = [
    {
      name: "Career Awareness",
      links: ["Carrer Choice", "Subject-Career Pathway"],
      linkUrl: ["/career-choice", "/subject-career-pathway"],
    },
    {
      name: "Skill",
      links: ["Add Skill", "Skill MCQ", "Skill Test", "Skill Report"],
      linkUrl: ["#", "/skill-mcq", "/skill-test", "#"],
    },
    {
      name: "Orders",
      links: ["Manage Order"],
      linkUrl: ["//manage-order"],
    },
    {
      name: "Product",
      links: ["Manage Product"],
      linkUrl: ["/manage-product"],
    },
    {
      name: "Advisors Panel",
      links: ["Be an Advisor"],
      linkUrl: ["/advisor"],
    },

    {
      name: "Communication Test",
      links: ["Communication Test", "Verify Communication Test"],
      linkUrl: ["/communication-test", "/verify-communication-test"],
    },

    {
      name: "HR Interview",
      links: ["Give Test"],
      linkUrl: ["/hr-give-test"],
    },

    {
      name: "Selection Process",
      links: ["HR Interaction"],
      linkUrl: ["/hr-interaction"],
    },

    {
      name: "Work Seeker",
      links: [
        "User Work",
        "User Experience",
        "User Education",
        "User Skills",
        "User Reference",
      ],
      linkUrl: [
        "/user-work",
        "/user-experience",
        "/user-education",
        "/user-skills",
        "/user-reference",
      ],
    },

    {
      name: "Study",
      links: [
        "Study Course",
        "Study Lesson",
        "Study MCQ",
        "MCQ Results",
        "Trainee Dashboard",
        "Study Content",
        "Study Video",
        "Study Activity",
        "Study Practical",
        "Teacher Dashboard",
        "Teacher Schedule",
        "Study Organiser",
        "Study Writer",
        "Progress Meter",
      ],
      linkUrl: [
        "/study-course",
        "/study-lesson",
        "/study-mcq",
        "/mcq-results",
        "/trainee-dashboard",
        "/study-content",
        "/study-video",
        "/study-activity",
        "/study-practical",
        "/teacher-dashboard",
        "/teacher-schedule",
        "/study-organiser",
        "/study-writer",
        "/progress-meter",
      ],
    },
    {
      name: "Communication",
      links: [
        "Email Report",
        "WhatsApp Report",
        "SMS Report",
        "Call Report",
        "Meeting Report",
        "Work Nodes",
        "Client Nodes",
      ],
      linkUrl: [
        "/email-report",
        "/whatsapp-report",
        "/sms-report",
        "/call-report",
        "/meeting-report",
        "/my-work-report",
        "/client-timeline",
      ],
    },
    {
      name: "Institute Management",
      links: ["Institute-Higher"],
      linkUrl: ["/institute-higher"],
    },
    {
      name: "CPP Training",
      links: ["Trainer Dashboard"],
      linkUrl: ["/trainer-dashboard"],
    },

    {
      name: "Career Assessment",
      links: [
        "Aptitude Assessment",
        "Attitude Assessment",
        "Ability Analyzer",
        "Career Map",
        "Verify Reference",
        "Dermeto Ability Verify",
        "Career Report"
      ],
      linkUrl: [
        "/aptitude-assesment",
        "/attitude-assesment",
        "/inborn-ability-analyser",
        "/career-map",
        "/verify-reference",
        "/dermato-ability-verify",
        "/career-report-admin"
      ],
    },
    {
      name: "Template",
      links: ["Templates List"],
      linkUrl: ["/templates-list"],
    },
    {
      name: "Business",
      links: ["Data Entry Form"],
      linkUrl: ["/business-data-entry"],
    },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const toggleLink = (link, categoryName, linkUrl) => {
    setSelectedLinks((prev) => {
      const newSet = new Set(prev);
      const linkObject = JSON.stringify({
        link,
        category: categoryName,
        linkUrl: linkUrl,
      });

      if (newSet.has(linkObject)) {
        newSet.delete(linkObject);
      } else {
        newSet.add(linkObject);
      }
      return newSet;
    });
  };

  const toggleAllInCategory = (category) => {
    setSelectedLinks((prev) => {
      const newSet = new Set(prev);
      const categoryLinks = category.links.filter((link) =>
        link.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const categoryLinkUrls = category.linkUrl.filter((link) =>
        link.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const allSelected = categoryLinks.every((link, index) =>
        newSet.has(
          JSON.stringify({
            link,
            category: category.name,
            linkUrl: categoryLinkUrls[index],
          })
        )
      );

      if (allSelected) {
        categoryLinks.forEach((link, index) =>
          newSet.delete(
            JSON.stringify({
              link,
              category: category.name,
              linkUrl: categoryLinkUrls[index],
            })
          )
        );
      } else {
        categoryLinks.forEach((link, index) =>
          newSet.add(
            JSON.stringify({
              link,
              category: category.name,
              linkUrl: categoryLinkUrls[index],
            })
          )
        );
      }
      return newSet;
    });
  };

  const isCategoryFullySelected = (category) => {
    const filteredLinks = category.links.map((link) => {
      return link;
    });
    const filteredLinkUrl = category.linkUrl.map((url) => {
      return url;
    });
    return (
      filteredLinks.length > 0 &&
      filteredLinks.every((link, index) =>
        selectedLinks.has(
          JSON.stringify({
            link,
            category: category.name,
            linkUrl: filteredLinkUrl[index],
          })
        )
      )
    );
  };

  const handleUpdate = async () => {
    if (selectedLinks.size == 0) {
      return toast.warn("Select at least one link");
    }
    if (!validUpto) {
      return toast.warn("Select Valid Upto Date");
    }

    const newLinks = Array.from(selectedLinks).map((linkObj, index) => {
      const { link, category, linkUrl } = JSON.parse(linkObj);
      return {
        id: savedLinks.length + index + 1,
        link,
        validUpto,
        linkGroup: category,
        linkUrl: linkUrl,
      };
    });
    // console.log(newLinks);
    // return;

    try {
      const save = await fetch(
        "https://margda.in:7000/api/master/link/assign-link",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.userID,
            Links: newLinks,
            valid: validUpto,
          }),
        }
      );
      const data = await save.json();
      if (save.ok) {
        toast.success(data.message);
        setSelectedLinks(new Set());
        fetchLinks();
        setValidUpto("");
        setCurrentPage(1); // Reset to first page after update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/link/delete-link",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ linkID: id }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        await fetchLinks();
      } else {
        console.error("Failed to delete link:", data.message);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const filteredCategories = linkCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.links.some((link) =>
        link.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Slice the savedLinks array based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = savedLinks.slice(indexOfFirstItem, indexOfLastItem);

  // Number of pages calculation
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(savedLinks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous Page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next Page
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedLinks(new Set());
    } else {
      const allLinkIds = new Set(savedLinks.map((link) => link.id));
      setSelectedLinks(allLinkIds);
    }
    setAllSelected(!allSelected);
  };

  // Check if all items are selected
  useEffect(() => {
    setAllSelected(savedLinks.every((link) => selectedLinks.has(link.id)));
  }, [selectedLinks, savedLinks]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl m-4 p-6  max-h-[600px] overflow-y-auto">
        {/* User Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Name
                  </div>
                </th>
                <th className="p-2 text-left">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" /> Email
                  </div>
                </th>
                <th className="p-2 text-left">
                  <div className="flex items-center">
                    <FaMobileAlt className="mr-2" /> Mobile
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">{user?.name || "N/A"}</td>
                <td className="p-2">{user?.email || "N/A"}</td>
                <td className="p-2">{user?.mobile || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Link Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">GIVE LINK</h3>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search categories or links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto border rounded-lg p-4">
            {filteredCategories.map((category) => (
              <div key={category.name} className="mb-4">
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="flex items-center"
                  >
                    {expandedCategories.has(category.name) ? (
                      <FaChevronDown className="text-gray-600" />
                    ) : (
                      <FaChevronRight className="text-gray-600" />
                    )}
                  </button>
                  <label className="flex items-center space-x-2 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCategoryFullySelected(category)}
                      onChange={() => toggleAllInCategory(category)}
                      className="rounded"
                    />
                    <span className="font-medium">{category.name}</span>
                  </label>
                </div>
                {expandedCategories.has(category.name) && (
                  <div className="ml-8 mt-2 space-y-2">
                    {category.links.map((link, index) => (
                      <label key={link} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedLinks.has(
                            JSON.stringify({
                              link,
                              category: category.name,
                              linkUrl: category.linkUrl[index],
                            })
                          )}
                          onChange={() =>
                            toggleLink(
                              link,
                              category.name,
                              category.linkUrl[index]
                            )
                          }
                          className="rounded"
                        />
                        <span>{link}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Valid Until & Update Button */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="valid-date"
                className="block text-sm font-medium mb-2"
              >
                Valid Until
              </label>
              <div className="flex items-center border rounded p-2">
                <input
                  type="date"
                  id="valid-date"
                  value={validUpto}
                  onChange={(e) => setValidUpto(e.target.value)}
                  className="w-full outline-none"
                />
                <label htmlFor="valid-date">
                  <FaCalendarAlt className="text-gray-500 ml-2" />
                </label>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Assign
              </button>
            </div>
          </div>
        </div>

        {/* Selected Links Table */}
        <div className="mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="p-2 text-left border">Valid Upto</th>
                <th className="p-2 text-left border">Link Group</th>
                <th className="p-2 text-left border">Link</th>
                <th className="p-2 text-left border">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLinks.map((item, index) => (
                <tr key={item.id} className="border">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedLinks.has(item.id)}
                      onChange={() => {
                        const newSelectedLinks = new Set(selectedLinks);
                        if (newSelectedLinks.has(item.id)) {
                          newSelectedLinks.delete(item.id);
                        } else {
                          newSelectedLinks.add(item.id);
                        }
                        setSelectedLinks(newSelectedLinks);
                      }}
                      className="rounded"
                    />
                  </td>
                  <td className="p-2">
                    {item.valid ? formatDate(item.valid) : "N/A"}
                  </td>
                  <td className="p-2">{item.group_link}</td>
                  <td className="p-2">{item.link}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(item.linkID)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="mr-2"
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage} of {pageNumbers.length}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === pageNumbers.length}
            className="ml-2"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded flex items-center hover:bg-gray-800"
          >
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLinkForm;
