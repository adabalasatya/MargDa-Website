import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ userLinks }) => {
  const location = useLocation();
  const [links, setLinks] = useState([]);

  const localUserData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = localUserData ? localUserData.access_token : null;

  // Extract pathname (e.g., /dashboard, /profile)
  const currentPath = location.pathname;

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
        "https://margda.in:7000/api/user/get-links",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        const links = result.data;
        setLinks(links);
      } else {
        setLinks([]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user has access to this route
  if (userLinks.includes(currentPath)) {
    return <Navigate to={currentPath} replace />;
  }

  // If no access, show 404 page
  return <Navigate to="/404" replace />;
};

export default PrivateRoute;
