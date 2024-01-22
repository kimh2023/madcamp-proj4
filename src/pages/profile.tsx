import MainLayout from "@/components/layoutComponents/MainLayout";
import React from "react";

const ProfilePage = () => {
  return <></>;
};
export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
