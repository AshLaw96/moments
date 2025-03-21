import React from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../context/ProfileDataContext";
import { Profile } from "./Profile";

const PopularProfiles = ({ mobile, limit = mobile ? 4 : undefined }) => {
  const { popularProfiles } = useProfileData();
  const profiles = popularProfiles?.results?.slice(0, limit) || [];

  return (
    <Container
      className={`${appStyles.Content} ${mobile ? "d-lg-none text-center mb-3" : ""}`}
    >
      {profiles.length > 0 ? (
        <>
          <p>Most followed profiles</p>
          <div className={mobile ? "d-flex justify-content-around" : ""}>
            {profiles.map((profile) => (
              <Profile key={profile.id} profile={profile} mobile={mobile} />
            ))}
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
