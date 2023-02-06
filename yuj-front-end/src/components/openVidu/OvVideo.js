import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (this.props.isActive === true ? (< video style={{width:'auto', height:'90vh'}} autoPlay = { true} ref = { this.videoRef } />) : (< video autoPlay = { true} ref = { this.videoRef } />))
    }

}
