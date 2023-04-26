import React from "react";
import Image from "react-bootstrap/Image";

class MapDisplay extends React.Component {
    reunder(){
        return(
            <Image src={this.props.img_url} alt={this.props.city} title={this.props.city} rounded fluid />
        )
    }
}

export default MapDisplay;
