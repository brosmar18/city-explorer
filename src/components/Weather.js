import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
    renderWeatherData() {
        return this.props.weather.map((weatherItem, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Date: {weatherItem.date}</Card.Title>
                        <Card.Text>
                            Description: {weatherItem.description}
                            <br />
                            High Temperature: {weatherItem.max_temp}
                            <br />
                            Low Temperature: {weatherItem.min_temp}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h2 className="weather">Weather</h2>
                    </Col>
                </Row>
                <Row>
                    {this.props.weather && this.renderWeatherData()}
                </Row>
            </Container>
        );
    }
}

export default Weather;
