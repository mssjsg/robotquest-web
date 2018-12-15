import React, { Component } from 'react'

class TimeCounter extends Component {
    constructor(props) {
        super(props);
        this.onTimeUpdated = this.onTimeUpdated.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.onTimeUpdated, this.props.interval);
    }

    onTimeUpdated() {
        this.props.onTimeUpdated(this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div></div>
    }
}

export default TimeCounter;