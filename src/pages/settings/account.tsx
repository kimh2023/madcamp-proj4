"use client";

import MainLayout from "@/components/settingsComponents/MainLayout";
import ChangePassword from "@/components/settingsComponents/account/ChangePassword";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";

import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AccountPage = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values);
    setErrorCode(null);
    const { data, error } = await axiosWrapper(
      axiosInstance.post("/auth/change-password", values),
    );
    console.log(data, error);

    if (error === null) {
      setIsSuccessVisible(true);
      setTimeout(() => {
        setIsSuccessVisible(false);
        form.resetFields();
      }, 1000);
    } else {
      form.resetFields();
      setErrorCode(error.status);
    }
  };

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
