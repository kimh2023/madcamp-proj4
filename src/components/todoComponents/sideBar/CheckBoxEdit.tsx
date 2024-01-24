import { TodoItemDto } from "@/types/TodoDto";
import styled from "styled-components";
import {
  BookFilled,
  BookOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteFilled,
  HomeFilled,
  HomeOutlined,
  PlayCircleTwoTone,
} from "@ant-design/icons";
import { style } from "@/styles/variables";
import { Button, Input, Modal, Radio, Select } from "antd";
import { useState } from "react";

const CompleteStateButton = ({
  completedState,
  setCompletedState,
}: {
  completedState: string;
  setCompletedState: (completedState: string) => void;
}) => {
  return (
    <Button
      type="dashed"
      shape="circle"
      onClick={() => {
        switch (completedState) {
          case "COMPLETE":
            setCompletedState("NOT_DONE");
            return;
          case "IN_PROGRESS":
            setCompletedState("COMPLETE");
            return;
          case "NOT_DONE":
            setCompletedState("IN_PROGRESS");
            return;
        }
      }}
      icon={
        (completedState === "COMPLETE" && (
          <CheckCircleTwoTone
            twoToneColor={style["COMPLETE"]}
            style={{ fontSize: "1.3rem" }}
          />
        )) ||
        (completedState === "IN_PROGRESS" && (
          <PlayCircleTwoTone
            twoToneColor={style["IN_PROGRESS"]}
            style={{ fontSize: "1.3rem" }}
          />
        )) ||
        (completedState === "NOT_DONE" && (
          <CloseCircleTwoTone
            twoToneColor={style["NOT_DONE"]}
            style={{ fontSize: "1.3rem" }}
          />
        ))
      }
    />
  );
};

const CheckBoxEdit = ({
  todoItem,
  setTodoItemState,
  deleteTodoItem,
}: {
  todoItem: TodoItemDto;
  setTodoItemState: (newState: Partial<TodoItemDto>) => void;
  deleteTodoItem: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TodoContainer>
      <CompleteStateButton
        completedState={todoItem.completed_in_progress}
        setCompletedState={(completedState: string) =>
          setTodoItemState({
            completed_in_progress: completedState,
          })
        }
      />
      <Input
        value={todoItem.task}
        onChange={(e) =>
          setTodoItemState({
            task: e.target.value,
          })
        }
        placeholder="이건 오늘 해야지!"
      ></Input>
      <Select
        options={animationOptions}
        value={todoItem.animation}
        onChange={(value: string) => setTodoItemState({ animation: value })}
        // style={{ minWidth: "105px" }}
      />
      <Radio.Group
        defaultValue={todoItem.place}
        buttonStyle="solid"
        style={{ flexShrink: 0 }}
        onChange={(e) =>
          setTodoItemState({
            place: e.target.value,
          })
        }
      >
        <Radio.Button value="HOME">
          {todoItem.place == "HOME" ? <HomeFilled /> : <HomeOutlined />}
        </Radio.Button>
        <Radio.Button value="SCHOOL">
          {todoItem.place == "HOME" ? <BookOutlined /> : <BookFilled />}
        </Radio.Button>
      </Radio.Group>
      <Button
        type="default"
        shape="circle"
        icon={<DeleteFilled />}
        onClick={() => {
          setIsModalOpen(true);
        }}
        style={{ marginTop: "auto" }}
      />
      <Modal
        title="진짜로 삭제하려구?"
        open={isModalOpen}
        onOk={() => {
          deleteTodoItem();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        // confirmLoading={confirmLoading}
        cancelText="앗 아니!"
        okText="응..."
      />
    </TodoContainer>
  );
};

export default CheckBoxEdit;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const animationOptions = [
  { value: "STUDY", label: "공부" },
  { value: "HOMEWORK", label: "과제" },
  { value: "CLEAN", label: "청소" },
  { value: "WASH", label: "빨래" },
  { value: "EXERCISE", label: "운동" },
];
