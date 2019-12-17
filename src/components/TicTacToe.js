import React from 'react';
import './TicTacToe.css';


function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let itm of lines) {
        let [a,b,c] = itm;
        if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (squares.filter(itm => itm === null).length === 0) {
        return "Tie"
    }
    return null;
}


function Square(props) {
    return (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            value = {this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}
        />
      );
    }
    render() {
    
        return (
            <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            level: "World Class",
            players: "One Player",
            first: "User Starts",
            gameOff: true
        }
        this.playersChange = this.playersChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.firstChange = this.firstChange.bind(this);
        this.gameStarts = this.gameStarts.bind(this);
    }

    async handleClick(i) {
        let history = this.state.history;
        let current = history[this.state.stepNumber]
        const squares = current.squares.slice();
        if (squares[i] || this.state.winner) {
            return;
        }
        this.state.xIsNext ? squares[i] = 'X' : squares[i] = 'O'
        let winner = calculateWinner(squares);
        history.push({squares: squares})
        await this.setState(state => ({
            history: history,
            stepNumber: history.length-1,
            xIsNext: !(state.xIsNext),
            winner: winner,
        }));
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "World Class") {
            this.worldClass();
        }
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "Hard") {
            this.hard();
        }
    }

    worldClass () {
        let goodSquares = this.evaluateSquares();
        let max = goodSquares[0].value;
        let bestSquares = goodSquares.filter(itm => itm.value === max);
        let random = this.getRndInteger(0, bestSquares.length-1)
        let index = bestSquares[random].index;
        setTimeout((index) => this.handleClick(index), 250, index)          
    }

    hard() {
        let goodSquares = this.evaluateSquares();
        let max = goodSquares[0].value;
        let bestSquares = goodSquares.filter(itm => itm.value === max);
        let goodNotBestSquars = goodSquares.filter(itm => itm.value !== max)
        let smartness = this.getRndInteger(1, 100)
        if (smartness <=30 && max <18 && goodNotBestSquars.length > 0) {
            goodNotBestSquars.sort((a, b) => (b.value - a.value))
            let secondMax = goodNotBestSquars[0].value;        
            let secondBestSquares = goodNotBestSquars.filter(itm => itm.value === secondMax);
            let random = this.getRndInteger(0, secondBestSquares.length-1)
            let index = secondBestSquares[random].index;
            setTimeout((index) => this.handleClick(index), 250, index)          
        } else {
            let random = this.getRndInteger(0, bestSquares.length-1)
            let index = bestSquares[random].index;
            setTimeout((index) => this.handleClick(index), 250, index)          
        }
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    evaluateSquares() {
        let history = this.state.history;
        let current = history[this.state.stepNumber]
        const squares = current.squares.slice();
        let evaluatedIndexes = [];
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for (let itm of lines) {
            let [a,b,c] = itm;
            if (squares[a] === null && squares[b] === "O" && squares[c] === "O") {
                evaluatedIndexes.push({index: a, value: 20});
            }
            if (squares[b] === null && squares[a] === "O" && squares[c] === "O") {
                evaluatedIndexes.push({index: b, value: 20});
            }
            if (squares[c] === null && squares[a] === "O" && squares[b] === "O") {
                evaluatedIndexes.push({index: c, value: 20});
            }
            if (squares[a] === null && squares[b] === "X" && squares[c] === "X") {
                evaluatedIndexes.push({index: a, value: 18});
            }
            if (squares[b] === null && squares[a] === "X" && squares[c] === "X") {
                evaluatedIndexes.push({index: b, value: 18});
            }
            if (squares[c] === null && squares[a] === "X" && squares[b] === "X") {
                evaluatedIndexes.push({index: c, value: 18});
            }
            if (squares[a] === null && squares[b] === null && squares[c] === "O") {
                evaluatedIndexes.push({index: a, value: 10});
                evaluatedIndexes.push({index: b, value: 10});
            }
            if (squares[a] === null && squares[c] === null && squares[b] === "O") {
                evaluatedIndexes.push({index: a, value: 10});
                evaluatedIndexes.push({index: c, value: 10});
            }
            if (squares[b] === null && squares[c] === null && squares[a] === "O") {
                evaluatedIndexes.push({index: b, value: 10});
                evaluatedIndexes.push({index: c, value: 10});
            }
            else {
                if (squares[a] === null) evaluatedIndexes.push({index: a, value: 1});
                if (squares[b] === null) evaluatedIndexes.push({index: b, value: 1});
                if (squares[c] === null) evaluatedIndexes.push({index: c, value: 1});
            }
        }
        evaluatedIndexes = evaluatedIndexes.map(itm => {
            if (
                ((squares[0] === "X" && squares[8] === "X") ||
                (squares[2] === "X" && squares[6] === "X")) &&
                (itm.index === 1 || itm.index === 3 || itm.index === 5 || itm.index === 7)
                ){
                return {index: itm.index, value: itm.value+5}
            } else if (itm.index === 4) {
                return {index: itm.index, value: itm.value+3}
            } else if (itm.index === 0 || itm.index === 2 || itm.index === 6 || itm.index === 8) {
                return {index: itm.index, value: itm.value+2}
            } else {
                return {index: itm.index, value: itm.value}
            }
        })
        evaluatedIndexes.sort((a, b) => (b.value - a.value))
        return evaluatedIndexes;  
    }

    async jumpTo(idx) {
        let history = this.state.history;
        let current = history[idx];
        const squares = current.squares.slice();
        let winner = calculateWinner(squares);
        if (this.state.first === "User Starts") {
            await this.setState({
                stepNumber: idx,
                xIsNext: idx%2 === 0,
                winner: winner,
            });
        }
        if (this.state.first === "Computer Starts") {
            await this.setState({
                stepNumber: idx,
                xIsNext: !(idx%2 === 0),
                winner: winner,
            });
        }
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "World Class") {
            this.worldClass();
        }
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "Hard") {
            this.hard();
        }
    }

    async playersChange(event) {
        await this.setState({players: event.target.value});
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "World Class") {
            this.worldClass();
        }
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player" &&
            this.state.level === "Hard") {
            this.hard();
        }

    }

    levelChange(event) {
        this.setState({level: event.target.value});
    }

    firstChange(event) {
        this.setState({first: event.target.value});
        this.setState(state => ({xIsNext: !(state.xIsNext)}))
    }

    gameStarts () {
        this.setState({gameOff: false});
        if (this.state.xIsNext === false &&
            this.state.winner === null &&
            this.state.players === "One Player") {
                let indexArray = [0, 2, 4, 6, 8];
                let random = this.getRndInteger(0, 4);
                let index = indexArray[random];
                setTimeout((index) => this.handleClick(index), 250, index); 
        }
    }


    render() {
        let history = this.state.history;
        let current = history[this.state.stepNumber]
        const squares = current.squares.slice();
        let status;
        if (this.state.xIsNext) {
            status = 'Next player: X';         
        }
        if (!this.state.xIsNext) {
            status = 'Next player: O';
        }
        if (this.state.winner != null) {
            status = `The Winner is ${this.state.winner}`
        }
        if (this.state.winner === "Tie") {
            status = `That was just a tie`
        }

        let movesList = history.map((itm,idx) => {
            const desc = idx ? 'Go to move #' + idx : 'Go to game start';
            return (
            <li key = {idx}>
            <button onClick={() => this.jumpTo(idx)}>{desc}</button>
            </li>
            );
        });

        return (
        <div className="game">
            {
            this.state.gameOff &&
            <select className="Options" value={this.state.players} onChange={this.playersChange}>
                <option value="One Player">One Player</option>
                <option value="Two Players">Two Players</option>
		    </select>
            }
            {
            this.state.players === "One Player" && this.state.gameOff &&
            <select className="Options" value={this.state.level} onChange={this.levelChange}>
                <option value="World Class">World Class</option>
                <option value="Hard">Hard</option>
		    </select>
            }
            {
            this.state.players === "One Player" && this.state.gameOff &&
            <select className="Options" value={this.state.first} onChange={this.firstChange}>
                <option value="User Starts">User Starts</option>
                <option value="Computer Starts">Computer Starts</option>
		    </select>
            }
            {
            this.state.gameOff &&
            <button onClick={this.gameStarts} className="Go">Go</button>
            }
            {
            !(this.state.gameOff) &&
            <div className="game">
                <div className="game-board">
                    <Board squares = {squares} onClick = {(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {movesList}
                    </ol>
                </div>
            </div>
            }
        </div>
      );
    }
}

export {Game};