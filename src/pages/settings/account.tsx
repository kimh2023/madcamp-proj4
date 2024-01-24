"use client";

import MainLayout from "@/components/settingsComponents/MainLayout";
import ChangePassword from "@/components/settingsComponents/account/ChangePassword";

import React from "react";

const AccountPage = () => {
  return (
    <React.Fragment>
      <ChangePassword />
      {/* <DeleteAccount /> */}
    </React.Fragment>
  );
};

export default AccountPage;

AccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
