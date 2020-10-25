import React from "react";
import { ExternalLink } from "react-external-link";
import Container from "react-bootstrap/Container";
import Typography from "@material-ui/core/Typography";

import "../scss/Landing.scss";

const Support = () => {
  return (
    <Container fluid className="px-4 pt-4">
      <div className="Question">
        <Typography variant="h6" align="left" className="my-2">
          Who is <div className="degreely">degree.ly</div> for?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <div className="degreely">degree.ly</div> is for students enrolled in
          the National University of Singapore (NUS).
        </Typography>
      </div>
      <div className="Question">
        <Typography variant="h6" align="left" className="pt-4 mb-2">
          Who is <div className="degreely">degree.ly</div> maintained by?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <div className="degreely">degree.ly</div> is maintained by a group of
          undergradute developers and designers from NUS.
        </Typography>
      </div>
      <div className="Question">
        <Typography variant="h6" align="left" className="pt-4 mb-2">
          What is the difference between{" "}
          <div className="degreely">degree.ly</div> and NUSMods?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <p>
            While NUSMods allows students to plan their modules for each
            semester, <div className="degreely">degree.ly</div> extends that by
            allowing students to plan modules for their whole duration of study
            (ie. their entire degree). Hence the name{" "}
            <div className="degreely">degree.ly</div> 😊.
          </p>
          <p>
            You can think of <div className="degreely">degree.ly</div> as a
            NUSMods timetable for all your semesters of schooling. Oh, and we
            include some pretty cool metrics too.
          </p>
        </Typography>
      </div>
      <div className="Question">
        <Typography variant="h6" align="left" className="pt-4 mb-2">
          Can I have more than one plan on{" "}
          <div className="degreely">degree.ly</div>?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <p>Sure, you can!</p>
          <p>
            Once you’re logged in, click on the dropdown on the top navigation
            bar and click on the last option “Add a new plan”.
          </p>
        </Typography>
      </div>
      <div className="Question">
        <Typography variant="h6" align="left" className="pt-4 mb-2">
          What can <div className="degreely">degree.ly</div> do for me?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <p>
            Glad you asked! Here is a list of how we can help plan your study:
          </p>
          <p>
            <ul>
              <li>Drag and drop modules into each semester</li>
              <li>Use module templates from faculty or other users</li>
              <li>Input predicted grade for modules to get a projected CAP</li>
              <li>Alert you about unallocated compulsory modules</li>
            </ul>
          </p>
        </Typography>
      </div>
      <div className="Question">
        <Typography variant="h6" align="left" className="pt-4 mb-2">
          Can you include [this feature]?
        </Typography>
        <Typography variant="subtitle1" align="left" className="mb-4">
          <p>We’re always open to suggestions.</p>
          <p>
            Drop us at email at{" "}
            <div className="degreely">degreely@gmail.com</div> or create an
            issue on our{" "}
            <ExternalLink
              className="External-link"
              href="https://github.com/degreely/degreely"
            >
              repository
            </ExternalLink>
            .
          </p>
        </Typography>
      </div>
    </Container>
  );
};

export default Support;
