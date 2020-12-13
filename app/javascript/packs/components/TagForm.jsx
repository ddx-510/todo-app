import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from "./AxiosHeaders";

class TagForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault()
    setAxiosHeaders();
    axios
      .post('/api/v1/tags', {
        tag: {
          title: this.titleRef.current.value
        },
      })
      .then(response => {
        const tag = response.data;
        this.props.createTag(tag);
        this.props.clearErrors();
      })
      .catch(error => {
        this.props.handleErrors(error);
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Write your tag here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Add Tag
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default TagForm

TagForm.propTypes = {
  createTag: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
