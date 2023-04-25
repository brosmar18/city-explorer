import React from "react";

class Form extends React.Component {
    render() {
        return (
            <>
                <form className="form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="city-name">City Name</label>
                        <input className="form__input" id="city-name" type="text" />
                    </div>
                    <div className="form__group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}


export default Form;
