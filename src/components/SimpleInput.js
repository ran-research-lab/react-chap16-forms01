import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");

  // L202. (A) create a state for the validity of the input
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

  // L203 (B) create a state to monitor if touched
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // L203 (A) If enteredNameIsValid is true from the beginning,
  //          then this action would be run at the beginning :-(
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log("Name input is valid");
  //   }
  // }, [enteredNameIsValid]);

  // L205 (B) We refactored the validation functions to this..
  const enteredNameIsValid = enteredName.trim() !== "";

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    // L205 (A) Important to check the parameter instead of the state
    //          because the state is scheduled and not immediately available
    // if (event.target.value.trim() !== "") {
    //   setEnteredNameIsValid(true);
    // }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // L203 (D) Any time that the user submits, we consider it touched
    setEnteredNameTouched(true);

    // L202 (B) conditional to determine validity, if not
    // valid then change state to false
    // if (enteredName.trim() === "") {
    //   console.log("setEnteredNameIsValid --> false");
    //   setEnteredNameIsValid(false);
    //   return;
    // }

    // L205 (C) We still want to avoid submitting if invalid, but now
    //          now we use the deduced variable
    if (!enteredNameIsValid) return;

    // L202 (C) change the state to true if valid
    // setEnteredNameIsValid(true);

    setEnteredName("");

    // L205 (D) Once the form is submitted it should acta as untouched
    setEnteredNameTouched(false);
  };

  // L204 (A) the blur handler sets the touched to true
  //          and also validates the input

  const nameInputBlurHandler = (event) => {
    // console.log("You blurring me: " + event.target.value);
    setEnteredNameTouched(true);

    // if (enteredName.trim() === "") {
    //   setEnteredNameIsValid(false);
    // }
  };

  // L203 (C) now is invalid is combo of two conditions
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // L202 (D) you may choose to change the style of the form
  // depending on validity
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* L202 (E) the variable nameInputClasses controls the style of the form*/}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        {/* L204 (B) need to set the onBlur trigger */}
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
      </div>
      {/* L202 (F) and the state controls if the message shows */}
      {/* L203 (C) we use the new combo condition */}
      {nameInputIsInvalid && (
        <p className="error-text">Name must not be empty.</p>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
