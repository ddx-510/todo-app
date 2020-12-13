import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import Tags from "./Tags";
import Tag from "./Tag";
import TagForm from "./TagForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

class TagMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      isLoading: true,
      errorMessage: null
    };
    this.getTags = this.getTags.bind(this);
    this.createTag = this.createTag.bind(this);
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
    this.getTags();
  }

  getTags() {
    axios
      .get("/api/v1/tags")
      //.get("/broken-end-point")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const tags = response.data;
        this.setState({ tags });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading your tags..."
          }
        });
        //console.log(error);
      });
  }

  createTag(tag) {
    const tags = [tag, ...this.state.tags];
    this.setState({ tags });
  }

  render() {
    return (
      <>
        {!this.state.isLoading && (
            <>
              <TagForm
                createTag={this.createTag}
                handleErrors={this.handleErrors}
                clearErrors={this.clearErrors}
              />
              <Tags>
                {this.state.tags.map(tag => (
                  <Tag
                    key={tag.id}
                    tag={tag}
                    getTags={this.getTags}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                  />
                ))}
              </Tags>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

export default TagMain
