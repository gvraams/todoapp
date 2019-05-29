import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent';
import { createList, deleteList } from '../actions/index';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (list) => dispatch(createList(list)),
    sendDelete: (list) => dispatch(deleteList(list)),
  }
}

class ConnectedLists extends React.Component {
  handleListCreate = (params, title) => {
    if (title === "") {
      return;
    }

    this.props.sendCreate({
      id: UUID.v4(),
      title,
      projectId: params['projectId'],
    });
  }

  render() {
    const { match, lists, projects } = this.props;
    const projectId = match.params['projectId'];
    const project = projects.find(project => project.id === projectId);
    let listsInProject = lists ? lists.filter(list => list.projectId === projectId) : [];

    listsInProject = listsInProject.length > 0 ? (listsInProject.map( (list) =>
      <li key={list.id}>
        <Link to={`/project/${list.projectId}/list/${list.id}/tasks`}>
          {list.title}
        </Link>
      </li>
    )) : null;

    return <TodoListContent
      header={project.title}
      onEnter={this.handleListCreate}
      placeholder="Create lists as a todo-list"
      listItems={listsInProject}
      urlParams={match.params}
    />;
  }
}

const AllLists = connect(mapStateToProps, mapDispatchToProps)(ConnectedLists);
export default withRouter(AllLists);
