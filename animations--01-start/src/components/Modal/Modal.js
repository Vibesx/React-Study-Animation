import React from "react";

import "./Modal.css";

const modal = (props) => {
	const cssClasses = [
		"Modal",
		props.show === "entering"
			? "ModalOpen"
			: props.show === "exiting"
			? "ModalClose"
			: null,
	];
	const onClickHandler = () => {
		props.closed();
	};
	return (
		<div className={cssClasses.join(" ")}>
			<h1>A Modal</h1>
			<button className="Button" onClick={onClickHandler}>
				Dismiss
			</button>
		</div>
	);
};

export default modal;

// CSSTransition wrapping method:
// import CSSTransition from "react-transition-group/CSSTransition";

// <CSSTransition
//         mountOnEnter
//         unmountOnExit
//         in={props.show}
//         timeout={animationTiming}
//         classNames={{
//             enter: '',
//             enterActive: 'ModalOpen',
//             exit: '',
//             exitActive: 'ModalClosed'
//         }}>
//           <div className="Modal">
//             <h1>A Modal</h1>
//             <button className="Button" onClick={props.closed}>
//               Dismiss
//             </button>
//           </div>
//     </CSSTransition>

// classNames can also take a string as a value and require us to define 4 classes in our css files: <our_value>-enter, -enter-active, -exit, -exit-active
// so in our css we should have, for a value of our-modal:
// .our-modal-enter, .our-modal-enter-active, .our-modal-exit, .our-modal-exit-active
// these will then be automatically recognized and applied at the right time of transition
