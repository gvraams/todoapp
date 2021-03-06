import React from 'react';
import UUID from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createProject, deleteProject } from '../../actions/project';
import { showNotificationWithTimeout } from '../../actions/notification';
import MainPageLayout from '../layout/MainPageLayout';
import TodoListContent from '../TodoListContent';
import TodoListInput from '../TodoListInput';

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  sendCreate: payload => dispatch(createProject(payload)),
  sendDelete: payload => dispatch(deleteProject(payload)),
  sendNotification: text => dispatch(showNotificationWithTimeout(text)),
});

class ConnectedProjects extends React.Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape).isRequired,
    match: PropTypes.shape.isRequired,
    sendCreate: PropTypes.func.isRequired,
    sendDelete: PropTypes.func.isRequired,
    sendNotification: PropTypes.func.isRequired,
  };

  handleProjectCreate = (params, title) => {
    if (title === '') {
      return;
    }

    const {
      sendCreate,
      sendNotification,
    } = this.props;

    sendCreate({
      id: UUID.v4(),
      title,
    });

    sendNotification(`Project "${title}" created successfully.`);
  }

  handleDelete = (id) => {
    const { projects, sendDelete, sendNotification } = this.props;
    const project = projects.find(p => p.id === id);

    sendDelete({
      id,
    });

    sendNotification(`Project "${project.title}" deleted successfully.`);
  }

  render() {
    const {
      match,
      projects,
    } = this.props;

    const collection = projects.map(project => (
      <div className="horizontally-aligned" key={project.id}>
        <li>
          <Link to={`/project/${project.id}/lists`}>
            {project.title}
          </Link>
        </li>
        <button type="submit" onClick={() => this.handleDelete(project.id)}>X</button>
      </div>
    ));

    const realEstate = (
      <div style={{ width: '13%' }} />
    );

    const todoListInput = (
      <TodoListInput
        onEnter={this.handleProjectCreate}
        placeholder="Create projects as a todo-list"
        urlParams={match.params}
      />
    );

    return (
      <MainPageLayout>
        { realEstate }

        <TodoListContent
          title="Projects"
          input={todoListInput}
          collection={collection}
        />

        { realEstate }
      </MainPageLayout>
    );
  }
}

const ProjectsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedProjects);
export default withRouter(ProjectsPage);
