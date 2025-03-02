import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Timeline from "./Timeline";

function ScheduleBody() {
  const [current, setCurrent] = useState(0);

  const handleChange = (day) => {
    setCurrent(day);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
        <div className="schedule_buttons">
          <Button
            className="schedule_button my-2"
            size="lg"
            active={current === 0}
            onClick={() => handleChange(0)}
          >
            Day 0
          </Button>
          <Button
            className="schedule_button my-2"
            size="lg"
            active={current === 1}
            onClick={() => handleChange(1)}
          >
            Day 1
          </Button>
          <Button
            className="schedule_button my-2"
            size="lg"
            active={current === 2}
            onClick={() => handleChange(2)}
          >
            Day 2
          </Button>
        </div>
        <Timeline day={current} />
      </div>
    </div>
  );
}

export default ScheduleBody;
