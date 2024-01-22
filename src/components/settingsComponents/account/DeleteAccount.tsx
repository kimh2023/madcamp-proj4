import { Typography } from "antd";
import { StyledCard } from "../SettingsCard";

const DeleteAccount = () => {
  return (
    <StyledCard
      title={
        <Typography.Title level={3} style={{ fontFamily: "Pointer" }}>
          계정 삭제
        </Typography.Title>
      }
    ></StyledCard>
  );
};

export default DeleteAccount;
