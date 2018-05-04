import React, { Component } from 'react';


class RoundScore extends Component {
    rowIndex = this.props.round - 1;
    render() {
        const scoreInput = this.props.playerScore.map((score, index) => ( // phải đúng thusws tự (score, index)
            <td>
                <input
                    type="text" placeholder="0"
                    value={score}
                    className="score-box"
                    onChange={(event) => this.props.onChangeScore(this.rowIndex, index, event.target.value)}
                />
            </td>
        ))
        return (
            <tr>
                <td>Round {this.props.round}</td>
                {scoreInput}
            </tr>
        );
    }
}

export default RoundScore;