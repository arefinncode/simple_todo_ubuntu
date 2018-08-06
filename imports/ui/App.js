import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import PropTypes from 'prop-types'; // ES6
// var PropTypes = require('prop-types'); // ES5 with npm

/**
 App component - represents the whole app
 */
class App extends Component {

    /**
     * Represents App.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            hideCompleted: false,
        };

        console.log("App's porps:",props);
        console.log("App's docgen info:",App.__docgenInfo);

    }


    /*
    COMMENTS BELOW ARE IMPORTANT. CAUSES SOME REMOVING 1 GENERATE OTHER WARNINGS /PROBLEMS. (AREFIN)
     */
    getDefaultProps(props){
        // static getDefaultProps(props){

        // static getDefaultProps(props){
        // this name is namespace collision error type warning due to some other pkgs.

        // static getDefaultProps(props){
        // this name is namespace collision error type warning due to some other pkgs.
        // function getArefinDefaultProps(props){
        // console.log("docgen information from ProfilePage: ",App.__docgenInfo);

        console.log("Props are in getDefaultProps ",props);

        // return props;
        // ProfilePage.props

        return {
            properties: props
            // one: {
            //     some: 1,
            //     type: 2,
            //     of: 3,
            //     value: 4
            // }
        };
        // return props;

        // return savedprops;
    }



    /** @function This is a description of the handleSubmit function. */
    handleSubmit(event) {
        event.preventDefault();

        /** Find the text field via the React ref**/
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        /** Clear form */
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    /** @function This is a description of the toggleHideCompleted function. */
    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    /**  @function  This is a description of the renderTasks function. */
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    render() {
        /*
     COMMENTS BELOW ARE IMPORTANT. CAUSES SOME REMOVING 1 GENERATE OTHER WARNINGS /PROBLEMS. (AREFIN)
      */
        // console.log("Props are in render of ProfilePage",this.props);
        this.getDefaultProps(this.props);
        // getDefaultProps(this.props);

        //const { label, onClick } = this.props;
        //added by arefin as in https://github.com/storybooks/babel-plugin-react-docgen

        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    /**
     * Description of prop "currentUser".
     */
    currentUser: PropTypes.object,
    // currentUser:PropTypes.object.isRequired,

    // not required now.
    //   currentUser: PropTypes.number
    // warning generated in console.

    /*
         /**
         * Description of prop "incompleteCount".
         */
    incompleteCount: PropTypes.number,

    /**
     * Description of prop "tasks".
     */

    tasks: PropTypes.arrayOf(Task), //write works.

    // tasks: PropTypes.number,

    /**
     * Description of prop "handleSubmit" (a custom function).
     */
    handleSubmit: function(event) {
        // ...event constitues the refs property of react (arefin)
    },


};


App.defaultProps = {
    foo: 42,
    bar: 21
};


export default withTracker(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);
