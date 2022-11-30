import React, { Component } from "react";
import { useState } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

// class App extends Component {
// 	state = { modalIsOpen: false };

// 	showModal = () => {
// 		console.log("show");
// 		this.setState({ modalIsOpen: true });
// 	};

// 	closeModal = () => {
// 		console.log("close");
// 		this.setState({ modalIsOpen: false });
// 	};

// 	render() {
// 		return (
// 			<div className="App">
// 				<h1>React Animations</h1>
// 				<Modal show={this.state.modalIsOpen} closed={this.closeModal} />
// 				<Backdrop show={this.state.modalIsOpen} />
// 				<button className="Button" onClick={this.showModal}>
// 					Open Modal
// 				</button>
// 				<h3>Animating Lists</h3>
// 				<List />
// 			</div>
// 		);
// 	}
// }

// in order to be able to pass this object to the timeout property of Transition, it needs to have these 2 fields: enter and exit,
// both being the time in miliseconds
const animationTiming = {
	enter: 400,
	exit: 1000,
};

function App(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [showBlock, setShowBlock] = useState(false);

	const showModalHandler = () => {
		setModalIsOpen(true);
	};

	const closeModalHandler = () => {
		setModalIsOpen(false);
	};

	return (
		<div className="App">
			<h1>React Animations</h1>
			<button
				className="Button"
				onClick={() => {
					setShowBlock((prevState) => {
						return !prevState;
					});
				}}
			>
				Toggle
			</button>
			<br />
			{/* mountOnEnter mounts this component in the DOM when it is rendered by the transition; unmountOnExit does the opposite, it removes it from the DOM on exit */}
			{/* timeout represents how long the transition will last, but it overrides the timeout of our css animation,
      so if we define an animation of 1000ms and set timeout to 300ms, it will cut the last 700ms of the animation */}
			{/* we can use onEvent properties to define certain behaviours we want on certain events;
      the order of events is: enter -> entering -> entered (after the timeout period); same applies to exit */}
			<Transition
				in={showBlock}
				timeout={300}
				mountOnEnter
				unmountOnExit
				onEnter={() => console.log("Enter")}
				onEntering={() => console.log("Entering")}
				onEntered={() => console.log("Entered")}
				onExit={() => console.log("Exit")}
				onExiting={() => console.log("Exiting")}
				onExited={() => console.log("Exited")}
			>
				{/* state is a property returned by Transition, which can be Entering, Entered, Exiting, Exited */}
				{(state) => {
					return (
						<div
							style={{
								backgroundColor: "red",
								width: 100,
								height: 100,
								margin: "auto",
								transition: "opacity 1s ease-out",
								opacity: state === "exiting" ? 0 : 1,
							}}
						></div>
					);
				}}
			</Transition>
			{/* we can move the transition up a level and wrap the JSX code returned by Modal in Transition and refactor */}
			{/* an alternative to Transition is CSSTransition, which is a bit more elegant; check docs online */}
			<Transition
				in={modalIsOpen}
				timeout={animationTiming}
				mountOnEnter
				unmountOnExit
			>
				{(state) => {
					return <Modal show={state} closed={closeModalHandler} />;
				}}
			</Transition>
			{modalIsOpen && <Backdrop show />}
			<button className="Button" onClick={showModalHandler}>
				Open Modal
			</button>
			<h3>Animating Lists</h3>
			<List />
		</div>
	);
}

export default App;
