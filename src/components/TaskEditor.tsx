import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/tasksSlice";
import { closeAddTask } from "../redux/addSlice";
import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  date: string;
  description: string;
}

const TaskEditor = ({ id, title, date, description }: Props) => {
  const [taskName, setTaskName] = useState(title);
  const [descriptionName, setDescriptionName] = useState(description);
  const dispatch = useDispatch();

  const editDate = JSON.stringify(new Date());

  const handleEditTask = (params: any) => {
    dispatch(editTask(params));
    dispatch(closeAddTask());
  };

  return (
    <div className="add_task_form">
      <label htmlFor="taskName">Task</label>
      <input
        className="add_task_input"
        autoFocus
        name={taskName}
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        className="add_task_input_description"
        name={descriptionName}
        value={descriptionName}
        onChange={e => setDescriptionName(e.target.value)}
      />
      <br />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="modal-edit-button"
        onClick={() =>
          handleEditTask({
            id: id,
            title: taskName,
            date: editDate,
            description: descriptionName,
          })
        }>
        Edit
      </motion.button>
    </div>
  );
};

export default TaskEditor;
