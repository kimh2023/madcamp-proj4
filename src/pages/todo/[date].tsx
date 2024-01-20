import { Layout } from "antd";
import SideBar from "@/components/sideBarComponents/SideBar";
import { useRouter } from "next/router";
import NotFound from "@/components/styledComponents/NotFound";

const TodoPage = () => {
  const router = useRouter();

  if (typeof router.query.date !== "string") {
    return <NotFound></NotFound>;
  }

  const date = new Date(router.query.date);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar date={date} />
    </Layout>
  );
};

export default TodoPage;
