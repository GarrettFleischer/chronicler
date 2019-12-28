import PropTypes from "prop-types";
import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Button } from "@material-ui/core";
import { addProject, Projects } from "../../../both/api/projects/projects";
import { DelayedButtonGrid } from "../components/DelayedButtonGrid";
import { PaperPage } from "./PaperPage";

const DashboardUI = ({ user, projects, history }) => {
  const items = projects.map(project => ({
    id: project._id,
    text: project.name,
    onClick: () => {
      history.push(`/project/${project._id}`);
    }
  }));

  const createProject = () => {
    addProject(`Project ${projects.length + 1}`, user.username || "Anonymous");
  };

  return (
    <PaperPage>
      <div style={{ margin: 16 }}>
        {user && (
          <Button variant="contained" color="secondary" onClick={createProject}>
            Create Project
          </Button>
        )}
      </div>
      <DelayedButtonGrid items={items} width={240} height={72} />
    </PaperPage>
  );
};

DashboardUI.propTypes = {
  user: PropTypes.object,
  projects: PropTypes.array
};

DashboardUI.defaultProps = {
  user: null,
  projects: []
};

const mapTrackerToProps = () => ({
  user: Meteor.user(),
  projects: Projects.find().fetch()
});

export const Dashboard = withTracker(mapTrackerToProps)(
  withRouter(DashboardUI)
);
