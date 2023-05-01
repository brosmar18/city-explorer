import React from "react";
import Image from "react-bootstrap/Image";

class MapDisplay extends React.Component {
    render(){
        return(
            <Image src={this.props.imgUrl} alt={this.props.cityName} title={this.props.cityName} rounded fluid />
        )
    }
}

export default MapDisplay;
