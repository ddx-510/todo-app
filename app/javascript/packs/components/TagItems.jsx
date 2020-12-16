import React from 'react'
import PropTypes from 'prop-types'

class TagItems extends React.Component {
  constructor(props) {
    super(props)
     //this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <>
        <hr />

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tags</th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    )
  }
}
export default TagItems
