import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../redux/tasksSlice";
import { useSelector } from "react-redux";
import { openAddTask, closeAddTask } from "../redux/addSlice";
import { dateSplitter } from "../utilities/dateSplitter";
import { motion } from "framer-motion";
type Props = {};

const TaskAdder = (props: Props) => {
  const isModalOpen = useSelector((state: any) => state.addTask.value);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const addThisTask = (props: any) => {
    dispatch(addTask(props));
    dispatch(closeAddTask());
  };
  const date = JSON.stringify(new Date());

  return (
    <div className="add_task_form">
      <label htmlFor="addTask">Task Title</label>
      <input
        autoFocus
        className="add_task_input"
        type="text"
        id="addTask"
        onChange={e => setTask(e.target.value)}
        value={task}
        autoComplete="false"
      />
      <label htmlFor="addDescription">Task Description</label>
      <textarea
        autoComplete="false"
        className="add_task_input_description"
        id="addDescription"
        onChange={e => setTaskDescription(e.target.value)}
        value={taskDescription}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="modal-add-button"
        onClick={() =>
          addThisTask({
            id: uuidv4(),
            title: task,
            date: dateSplitter(JSON.parse(date)),
            description: taskDescription,
          })
        }>
        ADD TASK
      </motion.button>
    </div>
  );
};

export default TaskAdder;
