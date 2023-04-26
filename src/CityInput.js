import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class CityInput extends Component {
    handleCitySubmit = async (event) => {
        event.preventDefault();
        this.props.displayLocationInfo();
    };

    render() {
        return (
            <Form onSubmit={this.handleCitySubmit} className="city-form">
                <Form.Group controlId="city">
                    <Form.Label>Search for Location:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={this.props.handleCityInput}
                        placeholder="Enter a city"
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Explore!</Button>
            </Form>
        );
    }
}

export default CityInput;
