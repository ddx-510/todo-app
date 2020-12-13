import React from 'react'
import PropTypes from 'prop-types'

import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

import _ from "lodash";

class Tag extends React.Component {
  constructor(props) {
    super(props)

    this.handleDestroy = this.handleDestroy.bind(this);
    this.path = `/api/v1/tags/${this.props.tag.id}`;


    this.handleChange = this.handleChange.bind(this);
    this.updateTag = this.updateTag.bind(this);
    this.inputRef = React.createRef();
    this.completedRef = React.createRef();

  }

  handleChange() {
    this.updateTag();
    this.setState({
      complete: this.completedRef.current.checked
    });
    this.updateTag();
  }

  updateTag = _.debounce(() => {
    setAxiosHeaders();
    axios
      .put(this.path, {
        tag: {
          title: this.inputRef.current.value
        }
      })
      .then(() => {
        this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      });
  }, 1000);


  handleDestroy() {
    setAxiosHeaders();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(this.path)
        .then(response => {
          this.props.getTag();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { tag } = this.props
    return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={tag.title}
            onChange={this.handleChange}
            ref={this.inputRef}
            className="form-control"
            id={`tag__title-${tag.id}`}
          />
        </td>
        <td className="text-right">
          <button onClick={this.handleDestroy}
          className="btn btn-outline-danger">Delete</button>
        </td>

      </tr>
    )
  }
}

export default Tag

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  getTag: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
