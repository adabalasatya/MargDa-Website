import React, { useState, useEffect } from "react";
import Category from "./MastCategory";
import Item from "./MastItem";
import Brand from "./MastBrand";
import ServiceType from "./MastServiceType";
import Service from "./MastService";
import MastLink from "./MastLink.jsx";
import Country from "./Country.jsx";
import State from "./State.jsx"
import District from "./District.jsx"
import PincodeUpload from "./PincodeUpload.jsx"
import CareerAbility from "./CareerAbility.jsx"
import CareerAptitude from "./CareerAptitude.jsx"
import CareerAttitude from "./CareerAttitude.jsx"
import CareerActivity from "./CareerActivity.jsx"
import CareerIndustry from "./CareerIndustry.jsx"
import CareerField from "./CareerField.jsx"
import CareerKnowledge from "./CareerKnowledge.jsx"
import CareerOutlook from "./CareerOutlook.jsx"
import CareerPathway from "./CareerPathway.jsx"
import CareerSkills from "./CareerSkills.jsx"
import CareerStem from "./CareerStem.jsx"
import CareerTalent from "./CareerTalent.jsx"
import CareerTech from "./CareerTech.jsx"
import CareerTools from "./CareerTools.jsx"
import CareerTrait from "./CareerTrait.jsx"
import CareerZone from "./CareerZone.jsx"
import Status from "./Status.jsx"
import Management from "./Management.jsx"
import MastPost from "./MastPost.jsx"
import MastRecognise from "./MastRecognise.jsx"


const MasterData = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://margda.in:7000/api/master/category/get-categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setCategories(result.data.sort((a, b) => b.id - a.id));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let content;
  switch (selectedOption) {
    case "mast_category":
      content = (
        <Category
          accessToken={accessToken}
          onCategoryAdded={fetchCategories}
          onCategoryDeleted={fetchCategories}
          onCategoryEdited={fetchCategories}
        />
      );
      break;
    case "mast_item":
      content = (
        <Item
          categories={categories}
          accessToken={accessToken}
          onItemAdded={fetchCategories}
          onItemDeleted={fetchCategories}
          onItemEdited={fetchCategories}
        />
      );
      break;
    case "mast_brand":
      content = (
        <Brand
          accessToken={accessToken}
          onBrandAdded={fetchCategories}
          onBrandDeleted={fetchCategories}
          onBrandEdited={fetchCategories}
        />
      );
      break;
    case "mast_servicetype":
      content = <ServiceType />;
      break;
    case "mast_service":
      content = <Service />;
      break;
    case "mast_link":
      content = <MastLink />;
      break;
     case "country":
        content = <Country />;
        break;
      case "state":
       content = <State />;
       break;
      case "district":
        content = <District />;
        break;
      case "pincode-upload":
       content = <PincodeUpload />;
       break;
       case "career-ability":
       content = <CareerAbility />;
       break;
       case "career-aptitude":
       content = <CareerAptitude />;
       break;
       case "career-attitude":
       content = <CareerAttitude />;
       break;
       case "career-activity":
        content = <CareerActivity />;
        break;
        case "career-industry":
        content = <CareerIndustry />;
        break;
        case "career-field":
        content = <CareerField />;
        break;
        case "career-knowledge":
        content = <CareerKnowledge/>;
        break;
        case "career-outlook":
        content = <CareerOutlook/>;
        break;
        case "career-pathway":
        content = <CareerPathway/>;
        break;
        case "career-skills":
        content = <CareerSkills/>;
        break;
        case "career-stem":
        content = <CareerStem/>;
        break;
        case "career-talent":
        content = <CareerTalent/>;
        break;
        case "career-tech":
        content = <CareerTech/>;
        break;
        case "career-tools":
        content = <CareerTools/>;
        break;
        case "career-trait":
       content = <CareerTrait/>;
       break;
       case "career-zone":
       content = <CareerZone/>;
       break;

       case "status":
       content = <Status/>;
       break;
       case "management":
       content = <Management/>;
       break;
       case "mast-post":
       content = <MastPost/>;
       break;
       case "mast-recognise":
       content = <MastRecognise/>;
       break;
    default:
      content = null;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Master Data</option>
          <option value="mast_category">Category</option>
          <option value="mast_item">Item</option>
          <option value="mast_brand">Brand</option>
          <option value="mast_service">Services</option>
          <option value="mast_servicetype">Service Types</option>
          <option value="mast_link">Mast Link</option>
          <option value="country">Country</option>
          <option value="state">State</option>
          <option value="district">District</option>
          <option value="pincode-upload">Pincode Upload</option>
          <option value="career-ability">Career Ability</option>
          <option value="career-aptitude">Career Aptitude</option>
          <option value="career-attitude">Career Attitude</option>
          <option value="career-activity">Career Activity </option>
          <option value="career-industry">Career Industry </option>
          <option value="career-field">Career Field </option>
          <option value="career-knowledge">Career Knowledge</option>
          <option value="career-outlook">Career Outlook</option>
          <option value="career-pathway">Career Pathway</option>
          <option value="career-skills">Career Skills</option>
          <option value="career-stem"> Career Stem</option>
          <option value="career-talent">Career Talent</option>
          <option value="career-tech">Career Tech</option>
          <option value="career-tools">Career Tools</option>
          <option value="career-trait">Career Trait</option>
          <option value="career-zone">Career Zone</option>
          <option value="status">Status</option>
          <option value="management">Management</option>
          <option value="mast-post">Mast Post</option>
          <option value="mast-recognise">Mast Recognise</option>
        </select>
      </div>
      {loading ? <div className="text-center">Loading...</div> : content}
    </div>
  );
};

export default MasterData;
