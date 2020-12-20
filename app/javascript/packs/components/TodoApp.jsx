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
      tagToggle:[],
      filterList:[],
      hideCompletedTodoItems: false,
      isLoading: true,
      errorMessage: null
    };

    this.getTodoItems = this.getTodoItems.bind(this);
    this.getTagItems = this.getTagItems.bind(this);
    this.createTodoItem = this.createTodoItem.bind(this);
    this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);

    this.addToList = this.addToList.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
    this.updateTagToggle = this.updateTagToggle.bind(this);
    this.checkFiltered = this.checkFiltered.bind(this);

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

  checkFiltered(todoItem){
    var filterList = this.state.filterList;
    var tagList = todoItem.all_tags.split(", ");
    var item_show = false;
    if (filterList.length === 0) {
      item_show = true;
    }
    else{
      for (var i = 0; i < filterList.length; i++) {
        item_show = item_show || tagList.includes(filterList[i]);
      }
    }
    return item_show;
  }

  updateTagToggle(name){
    const index = this.state.tagToggle.findIndex(el => el.name === name),
          tagToggle = [...this.state.tagToggle] // important to create a copy, otherwise you'll modify state outside of setState call
    tagToggle[index].item_show = !tagToggle[index].item_show ;
    this.setState({ tagToggle });
  }

  addToList(newname){
    const newList = this.state.filterList;
    newList.push(newname);
    this.state.filterList = newList;
  }

  deleteFromList(filter_name){
    var checked = this.state.filterList;
    var values = checked.indexOf(filter_name)
    checked.splice(values, 1);
    this.setState({filterList: checked});
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

        var tagToggle = [];
        for (var i = 0; i < tagItems.length; i++) {
          tagToggle.push(
            {
              name: tagItems[i].name,
              item_show: false
            });
        }
        var filterList = [];
        this.setState({ filterList });

        this.setState({ tagToggle });
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
          {this.state.isLoading && <Spinner />}
        </>

        {!this.state.isLoading && (
            <>
              <TodoForm
                createTodoItem={this.createTodoItem}
                handleErrors={this.handleErrors}
                clearErrors={this.clearErrors}
              />
                <TagItems>
                  {this.state.tagItems.map(tagItem => (
                    <TagItem
                      key={tagItem.id}
                      tagItem={tagItem}
                      getTagItems={this.getTagItems}
                      handleErrors={this.handleErrors}
                      clearErrors={this.clearErrors}
                      addToList={this.addToList}
                      deleteFromList={this.deleteFromList}
                      filterList={this.state.filterList}
                      tagToggle={this.state.tagToggle}
                      updateTagToggle={this.updateTagToggle}
                    />
                    ))}
                </TagItems>

              <TodoItems
                toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                hideCompletedTodoItems={this.state.hideCompletedTodoItems}
              >
                {this.state.todoItems.map(todoItem => (
                  <TodoItem
                    key={todoItem.id}
                    todoItem={todoItem}
                    filterList={this.state.filterList}
                    tagToggle={this.state.tagToggle}
                    getTodoItems={this.getTodoItems}
                    getTagItems={this.getTagItems}
                    hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}

                    checkFiltered={this.checkFiltered}
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
