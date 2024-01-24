import axiosInstance from "@/utils/api/axiosInstance";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import { formatDate } from "@/utils/formatDate";
import { Layout, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const { data, error } = await axiosWrapper(
        axiosInstance.get("/auth/refresh"),
      );
      if (error === null) {
        router.push(`/todo/${formatDate(null)}`);
      } else {
        router.push("/auth/login");
      }
    };
    checkAccess();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center" }}>
      <Spin />
    </Layout>
  );
};

export default Home;
