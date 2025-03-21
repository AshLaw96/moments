import axios from "axios";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus, redirectTo = "/") => {
  const navigate = useNavigate();

  const handleMount = useCallback(async () => {
    try {
      await axios.post("/dj-rest-auth/token/refresh/");
      if (userAuthStatus === "loggedIn") {
        navigate(redirectTo);
      }
    } catch (err) {
      if (userAuthStatus === "loggedOut") {
        navigate(redirectTo);
      }
    }
    // Depend on stable values
  }, [navigate, userAuthStatus, redirectTo]); 

  useEffect(() => {
    handleMount();
    // Depend on the stable function
  }, [handleMount]); 

};
