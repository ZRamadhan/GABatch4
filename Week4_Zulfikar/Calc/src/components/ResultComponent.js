import React, { Component } from 'react'

export default class ResultComponent extends Component {
    render() {
        let {result} = this.props;
        return (
            <div className="result-margin">
                <p>{result}</p>
            </div>
        )
    }
}
