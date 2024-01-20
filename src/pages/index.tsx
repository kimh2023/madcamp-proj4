import { Inter } from "next/font/google";
import { Layout } from "antd";
import SideBar from "@/components/sideBarComponents/SideBar";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
    </Layout>
  );
};

export default Home;
