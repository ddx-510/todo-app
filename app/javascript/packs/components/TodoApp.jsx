import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import TagItems from "./TagItems";
import TagItem from "./TagItem";
import TagForm from "./TagForm";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      tagItems:[],
      hideCompletedTodoItems: false,
      isLoading: true,
      errorMessage: null
    };

    this.getTodoItems = this.getTodoItems.bind(this);
    this.getTagItems = this.getTagItems.bind(this);
    this.createTodoItem = this.createTodoItem.bind(this);
    this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);

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

  toggleCompletedTodoItems() {
    this.setState({
      hideCompletedTodoItems: !this.state.hideCompletedTodoItems
    });
  }

  componentDidMount() {
    this.getTodoItems();
    this.getTagItems();
  }

  // remove duplicate elements based on key
  getUnique(array, key) {
    if (typeof key !== 'function') {
      const property = key;
      key = function(item) { return item[property]; };
    }
    return Array.from(array.reduce(function(map, item) {
      const k = key(item);
      if (!map.has(k)) map.set(k, item);
      return map;
    }, new Map()).values());
  }

  getTodoItems() {
    axios
      .get("/api/v1/todo_items")
      //.get("/broken-end-point")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        const todoItems = response.data;
        this.setState({ todoItems });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: true });
        this.setState({
          errorMessage: {
            message: "There was an error loading your todo items..."
          }
        });
        //console.log(error);
      });
  }

  getTagItems() {
    axios
      .get("/api/v1/tags")
      //.get("/broken-end-point")
      .then(response => {
        this.clearErrors();
        this.setState({ isLoading: true });
        // need to remove dupilicate tags
        const tagItems = this.getUnique(response.data, 'id');
        console.log(tagItems);
        this.setState({ tagItems });
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

  createTodoItem(todoItem) {
    const todoItems = [todoItem, ...this.state.todoItems];
    // update the tags by calling getTagItems
    const tag = this.getTagItems();
    this.setState({ todoItems });
    //this.setState({ tags });
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorMessage errorMessage={this.state.errorMessage} />
        )}

        <>
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

        {!this.state.isLoading && (
            <>
              <TodoForm
                createTodoItem={this.createTodoItem}
                handleErrors={this.handleErrors}
                clearErrors={this.clearErrors}
              />
              <TodoItems
                toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                hideCompletedTodoItems={this.state.hideCompletedTodoItems}
              >
                {this.state.todoItems.map(todoItem => (
                  <TodoItem
                    key={todoItem.id}
                    todoItem={todoItem}
                    getTodoItems={this.getTodoItems}
                    getTagItems={this.getTagItems}
                    hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                  />
                ))}
              </TodoItems>
          </>
        )}
        {this.state.isLoading && <Spinner />}
      </>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('todo-app')
  app && ReactDOM.render(<TodoApp />, app)
})
