import React from 'react'
import PropTypes from 'prop-types'

import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

import _ from "lodash";

class TagItem extends React.Component {
  constructor(props) {
    super(props)
    this.path = `/api/v1/tags/${this.props.tagItem.id}`;

  }

  handleChange() {
    this.updateTagItem();
  }


  render() {
    const { tagItem } = this.props
    return (
      <tr>
        <td>
          <p>
            {tagItem.name}
          </p>
        </td>
      </tr>
    )
  }
}

export default TagItem

TagItem.propTypes = {
  tagItem: PropTypes.object.isRequired,
  getTagItems: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}
