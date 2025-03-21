import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  // Prevent unnecessary API calls
  if (!resource.next) return;
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: [
        ...prevResource.results,
        ...data.results.filter(
          (newItem) => !prevResource.results.some((oldItem) => oldItem.id === newItem.id)
        )
      ],
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    };
  }
  if (profile.is_owner) {
    return { ...profile, following_count: profile.following_count + 1 };
  }
  // Return unchanged if not related to follow action
  return profile; 
};

export const unfollowHelper = (profile, clickedProfile) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    };
  }
  if (profile.is_owner) {
    return { ...profile, following_count: profile.following_count - 1 };
  }
  return profile;
};

export const setTokenTimestamp = (data) => {
  try {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token)?.exp;
    if (refreshTokenTimestamp) {
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
    }
  } catch (err) {
    console.error("Error decoding refresh token:", err);
  }
};

export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("refreshTokenTimestamp");
  // Convert timestamp to seconds
  return timestamp && Number(timestamp) > Date.now() / 1000; 
};

export const removeTokenTimestamp = () => {
  if (localStorage.getItem("refreshTokenTimestamp")) {
    localStorage.removeItem("refreshTokenTimestamp");
  } else {
    console.warn("No token timestamp found in localStorage.");
  }
};
