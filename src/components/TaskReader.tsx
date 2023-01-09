import { useState, useEffect } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import { openAddTask } from "../redux/addSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import TaskAdder from "./TaskAdder";
import Modal from "../components/Modal";
import TaskEditor from "./TaskEditor";
import EmptyTasks from "./EmptyTasks";

type Props = {};

const TaskReader = (props: Props) => {
  const dispatch = useDispatch();

  const [currentTaskReader, setCurrentTaskReader] = useState(<TaskAdder />);
  const [currentTaskTitle, setCurrentTaskTitle] = useState("Add Task");
  const [showTooltip, setShowTooltip] = useState(false);
  const tasks = useSelector((state: any) => state.tasks.value);
  const [reorderList, setReorderList] = useState(tasks);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleAddTask = () => {
    setCurrentTaskReader(<TaskAdder />);
    setCurrentTaskTitle("Add Task");
    dispatch(openAddTask());
  };

  const handleEditTask = (props: any) => {
    setCurrentTaskReader(<TaskEditor {...props} />);
    setCurrentTaskTitle("Edit Task");
    dispatch(openAddTask());
  };

  useEffect(() => {
    setReorderList(tasks);
  }, [tasks]);

  return (
    <>
      <div className="app-container">
        <div className="header">
          <div>
            <h1>Tsks</h1>
            {/* <h3>Add your task and Description!</h3> */}
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="add-main-button"
              onClick={handleAddTask}
            />
          </motion.div>
        </div>

        <Modal child={currentTaskReader} title={currentTaskTitle} />

        {tasks.length !== 0 ? (
          <motion.ol className="card__container">
            <AnimatePresence mode="popLayout">
              <Reorder.Group
                axis="y"
                values={reorderList}
                onReorder={setReorderList}>
                {reorderList.map((item: any) => {
                  return (
                    <Reorder.Item key={item.id} value={item}>
                      <motion.div
                        key={item.id}
                        className="box"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{ type: "spring", duration: 1.2 }}>
                        <div className="box-info">
                          <h1 className="box-info-title"> {item.title}</h1>
                          <h3 className="box-info-subtitle">
                            {" "}
                            {item.description}
                          </h3>
                          <h5 className="box-info-date">
                            {" "}
                            Last Modified: {JSON.stringify(item.date)}
                          </h5>
                        </div>
                        <div className="box-buttons">
                          <div className="button-container">
                            <p
                              className={
                                showTooltip ? "show-tooltip" : "hide-tooltip"
                              }>
                              edit
                            </p>

                            <FontAwesomeIcon
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                              id="my-element"
                              icon={faPenToSquare}
                              className="button-icon-edit"
                              onClick={() => handleEditTask({ ...item })}
                            />
                          </div>
                          <div className="button-container">
                            <p
                              className={
                                showTooltip ? "show-tooltip" : "hide-tooltip"
                              }>
                              delete
                            </p>
                            <FontAwesomeIcon
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                              id="button-icon-delete"
                              icon={faTrash}
                              className="button-icon-delete"
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                          {/* <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button> */}
                        </div>
                      </motion.div>
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </AnimatePresence>
          </motion.ol>
        ) : (
          <EmptyTasks />
        )}
      </div>
    </>
  );
};

export default TaskReader;
