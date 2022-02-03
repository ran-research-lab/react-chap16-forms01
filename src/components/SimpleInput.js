import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");

  // L202. (A) create a state for the validity of the input
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

  // L203 (B) create a state to monitor if touched
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // L203 (A) If enteredNameIsValid is true from the beginning,
  //          then this action would be run at the beginning :-(
  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name input is valid");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // L203 (D) Any time that the user submits, we consider it touched
    setEnteredNameTouched(true);

    // L202 (B) conditional to determine validity, if not
    // valid then change state to false
    if (enteredName.trim() === "") {
      console.log("setEnteredNameIsValid --> false");
      setEnteredNameIsValid(false);
      return;
    }

    // L202 (C) change the state to true if valid
    setEnteredNameIsValid(true);
    const enteredValue = nameInputRef.current.value;

    console.log(enteredValue);
    setEnteredName("");
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
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
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
