import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './styles.css';
var n = 0;
var m = 0;
class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = { inputvalue: "", todocode: [], footercode: []}
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    todo(x) {
        return(
        <li className="todo-app__item">
                       <div className="todo-app__checkbox">
                            <input type="checkbox" id={n}></input><label htmlFor={n}></label>
                           <h1 className="todo-app__view-button">{x}</h1>
                       </div>
                       <img src="x.png" className="todo-app__item-x" >
                       </img>
        </li>
        )
        }
    footer() {
        return (
             <footer className = "todo-app__footer" id="todo-footer">
                <div className="todo-app__total"> {m} left </div>
                <ul className="todo-app__view-buttons">
                    <li><button>All</button></li>
                    <li><button>Active</button></li>
                    <li><button>Completed</button></li>
                </ul>
                <div className="todo-app__clean"><button>Clear completed</button></div>
            </footer>
        )
    }

    render() {
        return (
            <section className="todo-app__main">
            <form onSubmit={this.handleSubmit}>
            <input className="todo-app__input" placeholder="What needs to be done?" value={this.state.inputvalue}
            onChange={(event) => this.setState({inputvalue: event.target.value})} />
            </form>
            {this.state.todocode}
            {this.state.footercode}
            </section>

    )
    }
    handleSubmit(event) {
        n += 1
        m += 1
        this.setState((prev) => { return {todocode: [...prev.todocode, this.todo(this.state.inputvalue)]}})
        this.setState({footercode: this.footer()})
        this.setState({inputvalue: ""})
        event.preventDefault()

    }





}
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <header className = "todo-app__header">todos</header>
            <List />
            </div>
        )
    }

}


export default App;
