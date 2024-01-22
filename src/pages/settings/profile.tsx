"use client";

import MainLayout from "@/components/settingsComponents/MainLayout";
import ViewProfile from "@/components/settingsComponents/profile/ViewProfile";
import React from "react";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <ViewProfile />
    </React.Fragment>
  );
};
export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
