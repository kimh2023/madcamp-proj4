import { Empty, Typography } from "antd";

const NotFound = () => {
  return (
    <Empty
      description={<Typography.Text>어라랏, 없다</Typography.Text>}
    ></Empty>
  );
};

export default NotFound;
