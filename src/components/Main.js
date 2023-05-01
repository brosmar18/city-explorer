import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LocationInfo from "./LocationInfo";
import CityInput from "./CityInput";
import MapDisplay from "./MapDisplay";
import Weather  from "./Weather";
import Movies from "./Movies";
import axios from "axios";


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
            weather: [],
            movies: [],
        };
    }

    handleCityInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            cityName: event.target.value,
        });
    };

    displayLocationInfo = async () => {
        console.log(this.state.cityName);
        // https://us1.locationiq.com/v1/search?key=pk.e868c5681f57c9f8ce3185a84d077069&q=Seattle&format=json
        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.cityName}&format=json`;
        console.log(url);
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
            },
            () => {
                this.getWeather(latitude, longitude);
                this.getMovies(this.state.cityName);
            }
            );
        } catch (error) {
            this.setState({
                showMap: false,
                displayError: true,
                errorMessage: error.response.status + ": " + error.response.data.error,
            });
        }
    };

    render() {

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
                                        imgUrl={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.latitude},${this.state.longitude}&zoom=11`}
                                        cityName={this.state.cityName}
                                    />
                                </Col>
                            </Row>
                            <Weather weather={this.state.weather}/>
                            <Movies movies={this.state.movies} />
                        </>
                    )}
                </Container>
            </>
        );
    }

    getWeather = async (lat, lon) => {
        try {
            let serverURL = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;

            let weatherResults = await axios.get(serverURL);
            this.setState({
                weather: weatherResults.data,
            });
        } catch (error) {
            this.setState({
                errorOccurred: true,
                errorMessage: error.response && error.response.status,
            });
        }
    };


    getMovies = async (searchQuery) => {
        try {
            let serverURL = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${searchQuery}`;
            let movieResults = await axios.get(serverURL);
            this.setState({
                movies: movieResults.data,
            });
        } catch (error) {
            this.setState({
                errorOccurred: true,
                errorMessage: error.response && error.response.status,
            });
        }
    };
}

export default Main;
