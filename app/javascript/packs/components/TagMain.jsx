import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import TagItems from "./TagItems";
import TagItem from "./TagItem";
import TagForm from "./TagForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

class TagMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagItems: [],
      isLoading: true,
      errorMessage: null
    };
    this.getTagItems = this.getTagItems.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);

  }

  handleErrors(errorMessage) {
    this.setState({ errorMessage });
  }

  clearErrors() {
    this.setState({
      errorMessage: null
    });
  }


  componentDidMount() {
    this.getTagItems();
  }

  getTagItems() {
    axios
      .get("/api/v1/tags")
      //.get("/broken-end-point")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const tagItems = response.data;
        this.setState({ tagItems });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading your tag items..."
          }
        });
        //console.log(error);
      });
  }


  render() {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}
        {!this.state.isLoading && (
            <>
              <TagItems>
                {this.state.tagItems.map(tagItem => (
                  <TagItem
                    key={tagItem.id}
                    tagItem={tagItem}
                    getTagItems={this.getTagItems}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                  />
                ))}
              </TagItems>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

export default TagMain
