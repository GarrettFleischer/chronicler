import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from '@material-ui/core';
import { addProject, Projects } from '../../../both/api/projects/projects';
import { DelayedButtonGrid } from '../DelayedButtonGrid';
import { PaperPage } from './PaperPage';


const DashboardUI = ({ user, projects }) => {
  const items = projects.map((project) => ({
    id: project._id,
    text: project.name,
    onClick: () => FlowRouter.go(`/project/${project._id}`),
  }));

  const createProject = () => {
    addProject(`Project ${projects.length + 1}`, user.username || 'Anonymous');
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
  projects: PropTypes.array,
};

DashboardUI.defaultProps = {
  user: null,
  projects: [],
};

const mapTrackerToProps = () => ({
  user: Meteor.user(),
  projects: Projects.find().fetch(),
});

export const Dashboard = withTracker(mapTrackerToProps)(DashboardUI);
