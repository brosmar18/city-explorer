import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LocationInfo from "./LocationInfo";
import CityInput from "./CityInput";
import MapDisplay from "./MapDisplay";
import axios from "axios";
console.log(process.env.REACT_APP_LOCATION_KEY);

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: "",
            cityData: {},
            errorOccurred: false,
            errorMessage: "",
            latitude: "",
            longitude: "",
            mapUrl: "",
            showMap: false,
        };
    }

    handleCityInputChange = (event) => {

        this.setState({
            cityName: event.target.value,
        });
    };

    displayLocationInfo = async () => {
        console.log("proof we made it ");
        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.cityName}&format=json`;

        try {
            let cityInfoResponse = await axios.get(url);
            let latitude = cityInfoResponse.data[0].lat;
            let longitude = cityInfoResponse.data[0].lon;

            this.setState({
                cityData: cityInfoResponse.data[0],
                errorOccurred: false,
                latitude: latitude,
                longitude: longitude,
                showMap: true,
            });
        } catch (error) {
            this.setState({
                showMap: false,
                displayError: true,
                errorMessage: error.response.status + ": " + error.response.data.error,
            });
        }
    };

    render() {

        console.log(this.state.latitude);
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col>
                            <CityInput
                                handleCityInputChange={this.handleCityInputChange}
                                displayLocationInfo={this.displayLocationInfo}
                                hasError={this.state.errorOccurred}
                                errorMessage={this.state.errorMessage}
                            />
                        </Col>
                    </Row>

                    {this.state.showMap && (
                        <>
                            <Row>
                                <Col>
                                    <LocationInfo
                                        cityName={this.state.cityName}
                                        lat={this.state.latitude}
                                        lon={this.state.longitude}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <MapDisplay
                                        imgUrl={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=12`}
                                        cityName={this.state.cityName}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </>
        );
    }
}

export default Main;
