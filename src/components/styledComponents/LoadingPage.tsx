import { Layout, Spin } from "antd";

const LoadingPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center" }}>
      <Spin />
    </Layout>
  );
};

export default LoadingPage;
