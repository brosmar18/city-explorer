import React from "react";

class Form extends React.Component {
    render() {
        return (
            <>
                <form className="form">
                    <fieldset className="form__fieldset">
                        <label className="form__label">City Name</label>
                        <input className="form__input" type="text"></input>
                    </fieldset>
                    <fieldset className="form__fieldset">
                        <button className="form__button" type="submit">Submit</button>
                    </fieldset>
                </form>
            </>
        )
    }
}


export default Form;
