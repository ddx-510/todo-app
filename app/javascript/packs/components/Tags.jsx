import React from 'react'
import PropTypes from 'prop-types'

class Tags extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <hr />

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    )
  }
}
export default Tags
