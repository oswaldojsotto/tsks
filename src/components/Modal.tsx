import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closeAddTask } from "../redux/addSlice";
import { addTask } from "../redux/tasksSlice";
import TaskAdder from "./TaskAdder";

type Props = {
  child: any;
  title: string;
};

const Modal = ({ child, title }: Props) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.addTask.value);
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="modal-overlay">
          <motion.div
            className="modal"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.5 }}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-content">{child}</div>
            <div className="modal-footer">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="modal-button"
                onClick={() => dispatch(closeAddTask())}>
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

const overlayVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      delayChildren: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.3,
      delay: 0.4,
    },
  },
};
