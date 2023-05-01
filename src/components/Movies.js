import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
    renderMoviesData() {
        return this.props.movies.map((movie, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
                <Card className="mb-3">
                    <Card.Img variant="top" src={movie.image_url} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>
                            Overview: {movie.overview}
                            <br />
                            Average Votes: {movie.average_votes}
                            <br />
                            Total Votes: {movie.total_votes}
                            <br />
                            Popularity: {movie.popularity}
                            <br />
                            Release Date: {movie.released_on}
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
                        <h2 className="movies">Movies</h2>
                    </Col>
                </Row>
                <Row>
                    {this.props.movies && this.renderMoviesData()}
                </Row>
            </Container>
        );
    }
}

export default Movies;
