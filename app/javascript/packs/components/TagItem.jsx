import React from 'react'
import PropTypes from 'prop-types'

import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

import _ from "lodash";

class TagItem extends React.Component {
  constructor(props) {
    super(props)
    this.path = `/api/v1/tags/${this.props.tagItem.id}`;
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(){
    const index = this.props.tagToggle.findIndex(el => el.name === this.props.tagItem.name);

    if (!this.props.tagToggle[index].item_show) {
      this.props.addToList(this.props.tagItem.name);
    }
    else {
      this.props.deleteFromList(this.props.tagItem.name);
    }
    this.props.updateTagToggle(this.props.tagItem.name);
  }

  render() {
    const { tagItem } = this.props
    return (
        <td>
          <button type="button" className="btn btn-outline-info" data-toggle="button" autoComplete="off" onClick={this.handleClick}>
            {tagItem.name}
          </button>
        </td>
    )
  }
}

export default TagItem

TagItem.propTypes = {
  updateTagToggle: PropTypes.func.isRequired,
  tagToggle: PropTypes.array.isRequired,
  addToList: PropTypes.func.isRequired,
  deleteFromList: PropTypes.func.isRequired,
  tagItem: PropTypes.object.isRequired,
  getTagItems: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
