import { TodoItemDto } from "@/types/TodoItemDto";
import styled from "styled-components";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  PlayCircleTwoTone,
} from "@ant-design/icons";
import { style } from "@/styles/variables";
import { Typography } from "antd";

const CheckBoxNoEdit = ({ todoItem }: { todoItem: TodoItemDto }) => {
  return (
    <TodoContainer>
      {todoItem.completed_in_progress === "COMPLETE" && (
        <CheckCircleTwoTone
          twoToneColor={style["COMPLETE"]}
          style={{ fontSize: "1.3rem" }}
        />
      )}
      {todoItem.completed_in_progress === "IN_PROGRESS" && (
        <PlayCircleTwoTone
          twoToneColor={style["IN_PROGRESS"]}
          style={{ fontSize: "1.3rem" }}
        />
      )}
      {todoItem.completed_in_progress === "NOT_DONE" && (
        <CloseCircleTwoTone
          twoToneColor={style["NOT_DONE"]}
          style={{ fontSize: "1.3rem" }}
        />
      )}
      <Typography.Text>
        {todoItem.task ? todoItem.task : "이건 오늘 해야지!"}
      </Typography.Text>
    </TodoContainer>
  );
};
export default CheckBoxNoEdit;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;
