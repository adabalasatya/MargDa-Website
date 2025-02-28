import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileSignature, FaComment, FaFilePdf } from "react-icons/fa";

// Importing icons as in your original code
import {
  FaPaintBrush, FaCar, FaCalculator, FaTheaterMasks, FaPlane, FaLeaf, 
  FaBusinessTime, FaTools, FaUtensils, FaHardHat, FaFlask, FaDatabase, 
  FaGlobe, FaBolt, FaBook, FaTv, FaMountain, FaMusic, FaMicroscope, 
  FaWeight, FaUserNurse, FaBuilding, FaShoppingCart, FaSun, FaTshirt,
  FaBriefcase, FaCode, FaBookReader, FaPenFancy, FaSuitcaseRolling, 
  FaSeedling, FaBalanceScale, FaLaptopCode, FaWrench, 
  FaDraftingCompass, FaDna, FaServer, FaChartLine, FaPlug, FaNewspaper,
  FaVideo, FaHiking, FaPills, FaDumbbell, FaAtom, FaKey, FaStore, 
  FaLandmark, FaSolarPanel, FaRulerCombined, FaHatCowboy
} from "react-icons/fa";
import { MdComputer } from "react-icons/md";

// Import all images
import ArtImage from '../../assets/images/art.webp';
import AccountantImage from '../../assets/images/accountant.png';
import ActorDancerImage from '../../assets/images/actor-dancer.png';
import AirTransportImage from "../../assets/images/air-transport.png"
import AutomotiveImage from "../../assets/images/automotive.png"

import BiologyImage from "../../assets/images/biology.png"
import BusinessImage from "../../assets/images/business-studies.png"

import CarerImage from "../../assets/images/carer.webp"
import CarpenterImage from "../../assets/images/carpenter.png"
import ChefImage from "../../assets/images/chef.png"
import ChemistryImage from "../../assets/images/chemistry.png"
import CivilEngineerImage from "../../assets/images/civil-engineer.png"
import ComputingImage from "../../assets/images/computing.png"
import ConstructionImage from "../../assets/images/construction.png"

import DatabaseAdminImage from "../../assets/images/database-admin.png"

import EconomicsImage from "../../assets/images/economics.png"
import ElectricianImage from "../../assets/images/electrician.png"
import ElectrotechnologyImage from "../../assets/images/electrotechnology.png"
import EnglishImage from "../../assets/images/english.webp"
import EntertainmentImage from "../../assets/images/entertainment.webp"
import EnvironmentImage from "../../assets/images/environment.webp"
import EnvironmentalAnalystImage from "../../assets/images/environmental-analyst.png"
import EnvironmentalScienceImage from "../../assets/images/environmental-science.png"

import FoodStudiesImage from "../../assets/images/food-studies.png"
import ForkliftDriverImage from "../../assets/images/forklift-driver.png"

import GeographyImage from "../../assets/images/geography.png"
import GraphicDesignerImage from "../../assets/images/graphic-designe.png"

import HairdresserImage from "../../assets/images/hairdresser.png"
import HealthScienceImage from "../../assets/images/health-science.png"
import HistoryImage from "../../assets/images/history.png"
import HomeScienceImage from "../../assets/images/home-science.png"
import HospitalityImage from "../../assets/images/hospitality.png"

import IndustrialArtsImage from "../../assets/images/industrial-arts.png"
import JournalistsImage from "../../assets/images/journalists.png"

import LanguagesImage from "../../assets/images/languages.png"
import LivestockFarmerImage from "../../assets/images/livestock-farmer.png"

import MathsImage from "../../assets/images/maths.png"
import MediaStudiesImage from "../../assets/images/media-studies.png"
import MetalWorkEngineeringImage from "../../assets/images/metal-work-engineering.png"
import MiningImage from "../../assets/images/mining.png"
import MusicImage from "../../assets/images/music.png"

import OutdoorEducationImage from "../../assets/images/outdoor-education.png"
import OutdoorEducatorImage from "../../assets/images/outdoor-educator.png"

import PerformingArtsImage from "../../assets/images/performing-arts.png"
import PharmacistImage from "../../assets/images/pharmacist.png"
import PhysicalEducationImage from "../../assets/images/physical-education.png"
import PhysicsImage from "../../assets/images/physics.png"
import PrimaryTeacherImage from "../../assets/images/primary-teacher.png"

import RealEstateAgentImage from "../../assets/images/real-estate-agent.png"
import RetailImage from "../../assets/images/retail.png"
import RuralStudiesImage from "../../assets/images/rural-studies.png"

import SocialScienceImage from "../../assets/images/social-science.png"
import SocialSciencesImage from "../../assets/images/social-sciences.png"
import SocialServiceImage from "../../assets/images/social-service.png"
import SolarPanelInstallerImage from "../../assets/images/solar-panel-installer.png"

import TextilesDesignImage from "../../assets/images/textiles.png"

const SubjectCareerPathway = () => {
  const navigate = useNavigate(); // Hook for navigation

  const subjects = [
    ["Art", "Art.pdf", <FaPaintBrush style={{ color: "#FF5733" }} />, ArtImage, "Find out what occupations are related to the learning area of Art."],
    ["Accountant", "Accountant.pdf", <FaCalculator style={{ color: "#F39C12" }} />,AccountantImage, "Find out what occupations are related to the learning area of Accountant."],
    ["Actor-Dancer", "Actor-Dancer.pdf", <FaTheaterMasks style={{ color: "#9B59B6" }} />, ActorDancerImage, "Find out what occupations are related to the learning area of Actor-Dancer."],
    ["Air Transport", "Airtransport.pdf", <FaPlane style={{ color: "#2ECC71" }} />, AirTransportImage, "Find out what occupations are related to the learning area of Air Transport."],
    ["Automotive", "Automotive.pdf", <FaCar style={{ color: "#3498DB" }} />, AutomotiveImage, "Find out what occupations are related to the learning area of Automotive."],

    ["Biology", "Biology.pdf", <FaLeaf style={{ color: "#27AE60" }} />, BiologyImage, "Find out what occupations are related to the learning area of Biology."],
    ["Business Studies", "Business_studies.pdf", <FaBusinessTime style={{ color: "#E67E22" }} />, BusinessImage, "Find out what occupations are related to the learning area of Business Studies."],

    ["Carer", "Carer.pdf", <FaUserNurse style={{ color: "#EC7063" }} />, CarerImage, "Find out what occupations are related to the learning area of Carer."],
    ["Carpenter", "Carpenter.pdf", <FaTools style={{ color: "#34495E" }} />, CarpenterImage, "Find out what occupations are related to the learning area of Carpenter."],
    ["Chef", "Chef.pdf", <FaUtensils style={{ color: "#E74C3C" }} />, ChefImage, "Find out what occupations are related to the learning area of Chef."],
    ["Chemistry", "Chemistry.pdf", <FaFlask style={{ color: "#8E44AD" }} />, ChemistryImage, "Find out what occupations are related to the learning area of Chemistry."],
    ["Civil Engineer", "Civil-engineer.pdf", <FaDraftingCompass style={{ color: "#F1C40F" }} />, CivilEngineerImage, "Find out what occupations are related to the learning area of Civil Engineer."],
    ["Computing", "Computer.pdf", <MdComputer style={{ color: "#2980B9" }} />, ComputingImage, "Find out what occupations are related to the learning area of Computing."],
    ["Construction", "Construction.pdf", <FaHardHat style={{ color: "#fc0324" }} />, ConstructionImage, "Find out what occupations are related to the learning area of Construction."],

    ["Database Admin", "Database-admin.pdf", <FaDatabase style={{ color: "#16A085" }} />, DatabaseAdminImage, "Find out what occupations are related to the learning area of Database Admin."],

    ["Economics", "Economics.pdf", <FaChartLine style={{ color: "#D35400" }} />, EconomicsImage, "Find out what occupations are related to the learning area of Economics."],
    ["Electrician", "Electrician.pdf", <FaPlug style={{ color: "#03fcce" }} />, ElectricianImage, "Find out what occupations are related to the learning area of Electrician."],
    ["Electrotechnology", "Electrotechnology.pdf", <FaPlug style={{ color: "#03fcce" }} />, ElectrotechnologyImage, "Find out what occupations are related to the learning area of Electrotechnology."],
    ["English", "English.pdf", <FaBook style={{ color: "#5D6D7E" }} />, EnglishImage, "Find out what occupations are related to the learning area of English."],
    ["Entertainment", "Entertainment.pdf", <FaVideo style={{ color: "#A569BD" }} />, EntertainmentImage, "Find out what occupations are related to the learning area of Entertainment."],
    ["Environment", "Environ_sciences.pdf", <FaSeedling style={{ color: "#1E8449" }} />, EnvironmentImage, "Find out what occupations are related to the learning area of Environment."],
    ["Environmental Analyst", "Environmental-analyst.pdf", <FaMicroscope style={{ color: "#1E8449" }} />, EnvironmentalAnalystImage, "Find out what occupations are related to the learning area of Environmental Analyst."],
    ["Environmental Science", "Environmental-science.pdf", <FaLeaf style={{ color: "#1E8449" }} />, EnvironmentalScienceImage, "Find out what occupations are related to the learning area of Environmental Science."],

    ["Food Studies", "Food_studies.pdf", <FaUtensils style={{ color: "#E74C3C" }} />, FoodStudiesImage, "Find out what occupations are related to the learning area of Food Studies."],
    ["Forklift Driver", "Forklift-driver.pdf", <FaCar style={{ color: "#3498DB" }} />, ForkliftDriverImage, "Find out what occupations are related to the learning area of Forklift Driver."],

    ["Geography", "Geography.pdf", <FaGlobe style={{ color: "#2980B9" }} />, GeographyImage, "Find out what occupations are related to the learning area of Geography."],
    ["Graphic Designer", "Graphic-designer.pdf", <FaPenFancy style={{ color: "#C0392B" }} />, GraphicDesignerImage, "Find out what occupations are related to the learning area of Graphic Designer."],

    ["Hairdresser", "Hairdresser.pdf", <FaTshirt style={{ color: "#8E44AD" }} />, HairdresserImage, "Find out what occupations are related to the learning area of Hairdresser."],
    ["Health Science", "Health-Science.pdf", <FaUserNurse style={{ color: "#EC7063" }} />, HealthScienceImage, "Find out what occupations are related to the learning area of Health Science."],
    ["History", "History.pdf", <FaBookReader style={{ color: "#26252e" }} />, HistoryImage, "Find out what occupations are related to the learning area of History."],
    ["Home Science", "Home_science.pdf", <FaBriefcase style={{ color: "#F39C12" }} />, HomeScienceImage, "Find out what occupations are related to the learning area of Home Science."],
    ["Hospitality", "Hospitality.pdf", <FaBuilding style={{ color: "#03adfc" }} />, HospitalityImage, "Find out what occupations are related to the learning area of Hospitality."],

    ["Industrial Arts", "Industrial-arts.pdf", <FaWrench style={{ color: "#8E44AD" }} />, IndustrialArtsImage, "Find out what occupations are related to the learning area of Industrial Arts."],
    ["Journalists", "Journalists.pdf", <FaNewspaper style={{ color: "#D35400" }} />, JournalistsImage, "Find out what occupations are related to the learning area of Journalists."],

    ["Languages", "Languages.pdf", <FaGlobe style={{ color: "#2980B9" }} />, LanguagesImage, "Find out what occupations are related to the learning area of Languages."],
    ["Livestock Farmer", "Livestock-farmer.pdf", <FaSeedling style={{ color: "#1E8449" }} />, LivestockFarmerImage, "Find out what occupations are related to the learning area of Livestock Farmer."],

    ["Maths", "Maths.pdf", <FaBalanceScale style={{ color: "#F39C12" }} />, MathsImage, "Find out what occupations are related to the learning area of Maths."],
    ["Media Studies", "Media_studies.pdf", <FaTv style={{ color: "#3498DB" }} />, MediaStudiesImage, "Find out what occupations are related to the learning area of Media Studies."],
    ["Metal Work Engineering", "Metal_work_engineering.pdf", <FaTools style={{ color: "#34495E" }} />, MetalWorkEngineeringImage, "Find out what occupations are related to the learning area of Metal Work Engineering."],
    ["Mining", "Mining.pdf", <FaServer style={{ color: "#F1C40F" }} />, MiningImage, "Find out what occupations are related to the learning area of Mining."],
    ["Music", "Music.pdf", <FaMusic style={{ color: "#9B59B6" }} />, MusicImage, "Find out what occupations are related to the learning area of Music."],

    ["Outdoor Education", "Outdoor_education.pdf", <FaHiking style={{ color: "#1E8449" }} />, OutdoorEducationImage, "Find out what occupations are related to the learning area of Outdoor Education."],
    ["Outdoor Educator", "Outdoor-educator.pdf", <FaHiking style={{ color: "#1E8449" }} />, OutdoorEducatorImage, "Find out what occupations are related to the learning area of Outdoor Educator."],

    ["Performing Arts", "Performing_arts.pdf", <FaTheaterMasks style={{ color: "#9B59B6" }} />, PerformingArtsImage, "Find out what occupations are related to the learning area of Performing Arts."],
    ["Pharmacist", "Pharmacist.pdf", <FaPills style={{ color: "#C0392B" }} />, PharmacistImage, "Find out what occupations are related to the learning area of Pharmacist."],
    ["Physical Education", "Physical-education.pdf", <FaDumbbell style={{ color: "#27AE60" }} />, PhysicalEducationImage, "Find out what occupations are related to the learning area of Physical Education."],
    ["Physics", "Physics.pdf", <FaAtom style={{ color: "#8E44AD" }} />, PhysicsImage, "Find out what occupations are related to the learning area of Physics."],
    ["Primary Teacher", "Primary-teacher.pdf", <FaBook style={{ color: "#5D6D7E" }} />, PrimaryTeacherImage, "Find out what occupations are related to the learning area of Primary Teacher."],

    ["Real Estate Agent", "Realestate-agent.pdf", <FaHatCowboy style={{ color: "#3ac208" }} />, RealEstateAgentImage, "Find out what occupations are related to the learning area of Real Estate Agent."],
    ["Retail", "Retail.pdf", <FaStore style={{ color: "#E74C3C" }} />, RetailImage, "Find out what occupations are related to the learning area of Retail."],
    ["Rural Studies", "Rural_studies.pdf", <FaSeedling style={{ color: "#1E8449" }} />, RuralStudiesImage, "Find out what occupations are related to the learning area of Rural Studies."],

    ["Social Science", "Social_science.pdf", <FaLandmark style={{ color: "#D35400" }} />, SocialScienceImage, "Find out what occupations are related to the learning area of Social Science."],
    ["Social Sciences", "Social_sciences.pdf", <FaLandmark style={{ color: "#D35400" }} />, SocialSciencesImage, "Find out what occupations are related to the learning area of Social Sciences."],
    ["Social Service", "Social_service.pdf", <FaUserNurse style={{ color: "#EC7063" }} />, SocialServiceImage, "Find out what occupations are related to the learning area of Social Service."],
    ["Solar Panel Installer", "Solarpanel-installer.pdf", <FaSolarPanel style={{ color: "#472433" }} />, SolarPanelInstallerImage, "Find out what occupations are related to the learning area of Solar Panel Installer."],

    ["Textiles Design", "Textiles_design.pdf", <FaRulerCombined style={{ color: "#2980B9" }} />, TextilesDesignImage, "Find out what occupations are related to the learning area of Textiles Design."]
];

  const handlePdfClick = (pdfFile) => {
    navigate(`/pdf-viewer/${pdfFile}`); // Navigate to the PDF viewer page
  };

  return (
    <div className="min-h-screen bg-gray-50">
  <main className="container mx-auto px-6 py-10">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-primary flex items-center">
        <FaFileSignature className="mr-3 text-blue-600 hover:text-blue-700 transition duration-200" />
        <span className="hover:text-blue-700 transition duration-200">
          Career Subject Pathway
        </span>
      </h2>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map(([name, pdf, icon, imagePath, description], index) => (
        <div
          key={index}
          onClick={() => handlePdfClick(pdf)}
          className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
        >
          <img src={imagePath} alt={name} className="w-full h-48 object-cover" />
          <div className="p-5">
            <h3
              onClick={() => handlePdfClick(pdf)}
              className="text-xl font-semibold text-gray-900 flex items-center cursor-pointer hover:underline hover:text-blue-600 transition duration-200"
            >
              {icon}
              <span className="ml-3">{name}</span>
            </h3>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
        </div>
      ))}
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
      <p className="mb-4 sm:mb-0">
        <a
          href="https://www.margda.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black font-bold"
        >
          Margdarshak
        </a>{" "}
        © 2025
      </p>
      <ul className="flex space-x-5">
        <li>
          <a href="#" className="hover:text-black">Support</a>
        </li>
        <li>
          <a href="#" className="hover:text-black">Help Center</a>
        </li>
        <li>
          <a href="#" className="hover:text-black">Privacy</a>
        </li>
        <li>
          <a href="#" className="hover:text-black">Terms</a>
        </li>
      </ul>
    </div>
  </footer>
</div>
  );
};

export default SubjectCareerPathway;