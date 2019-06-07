import React from 'react';
import { Link } from 'react-router-dom';

class LinkToProject extends React.Component {
  render() {
    const { project } = this.props;

    return (
      <React.Fragment>
        <br />
        <Link to={`/project/${project.id}/lists`} >
          {project.title}
        </Link>
        <br />
      </React.Fragment>
    );
  }
}

export default LinkToProject;
