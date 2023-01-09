import React from "react";

type Props = {};

const EmptyTasks = (props: Props) => {
  return (
    <div className="empty-main">
      Seems like there's nothing here, try add a new Task{" "}
    </div>
  );
};

export default EmptyTasks;
