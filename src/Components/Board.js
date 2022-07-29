import React from "react";
import Square from "./Square";
import Unit from "./Unit";
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

class Board extends React.Component {

    rows;
    cols;
    initsquares;

    constructor(props) {
        super(props)
        this.rows = props.rows || 20;
        this.cols = props.cols || 20;
        this.initsquares = [...Array(this.rows)].map(() => Array(this.cols).fill(""))
        this.state = {
            units: [...Array(this.rows)].map(() => Array(this.cols).fill("")),
            squares: JSON.parse(JSON.stringify(this.initsquares)),
            mode: "static",
            selected: ""
        }
        props.initial.forEach(element => {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.units[element.row][element.col] = element.unit

        });
        this.move = this.move.bind(this)
    }

    check(row, col) {
        if (row < 0 || row > this.rows - 1 || col < 0 || col > this.cols - 1) {
            return false
        } else return this.state.units[row][col]
    }

    isLit(row, col) {
        return (
            this.check(row, col) ||
            this.check(row, col + 1) ||
            this.check(row, col + 2) ||
            this.check(row, col + 3) ||
            this.check(row, col - 1) ||
            this.check(row, col - 2) ||
            this.check(row, col - 3) ||
            this.check(row + 1, col) ||
            this.check(row + 1, col + 1) ||
            this.check(row + 1, col - 1) ||
            this.check(row + 1, col + 2) ||
            this.check(row + 1, col - 2) ||
            this.check(row - 1, col) ||
            this.check(row - 1, col + 1) ||
            this.check(row - 1, col - 1) ||
            this.check(row - 1, col + 2) ||
            this.check(row - 1, col - 2) ||
            this.check(row + 2, col) ||
            this.check(row + 2, col + 1) ||
            this.check(row + 2, col - 1) ||
            this.check(row - 2, col) ||
            this.check(row - 2, col + 1) ||
            this.check(row - 2, col - 1) ||
            this.check(row + 3, col) ||
            this.check(row - 3, col)
        )
    }

    getUnit(row, col) {
        const unit = this.state.units[row][col];

        switch (this.state.mode) {
            case "static": return (
                unit ? <Unit menuItems={this.items(row, col)} name={unit.name} image={unit.image} /> : null 
                )
            case "move": return (
                unit ? <Unit menuItems={<MenuItem>Move In Progress!</MenuItem>} image={unit.image} /> : null
                )
            default: break;
        }
        
        return 
    }

    items(row, col) {
        return (
            <>
                <MenuItem onClick={() => this.handleMove(row, col)}>Move</MenuItem>
                <MenuItem>Attack</MenuItem>
            </>
        )
    }

    move(toR, toC) {
        const selected = this.state.selected
        const newUnits = this.state.units
        newUnits[toR][toC] = newUnits[selected.row][selected.col]
        newUnits[selected.row][selected.col] = ""
        this.setState({
            units: newUnits,
            selected: "",
            mode: "static",
            squares: JSON.parse(JSON.stringify(this.initsquares))
        })
    }

    handleMove(row, col) {
        const newSquares = this.state.squares;
        if (this.check(row - 2, col) === "") newSquares[row - 2][col] = "highlighted_grass.png"
        if (this.check(row - 1, col - 1) === "") newSquares[row - 1][col -1] = "highlighted_grass.png"
        if (this.check(row - 1, col) === "") newSquares[row - 1][col] = "highlighted_grass.png"
        if (this.check(row - 1, col + 1) === "") newSquares[row - 1][col + 1] = "highlighted_grass.png"
        if (this.check(row, col - 2) === "") newSquares[row][col - 2] = "highlighted_grass.png"
        if (this.check(row, col - 1) === "") newSquares[row][col -1] = "highlighted_grass.png"
        if (this.check(row, col + 1) === "") newSquares[row][col+1] = "highlighted_grass.png"
        if (this.check(row, col + 2) === "") newSquares[row][col+2] = "highlighted_grass.png"
        if (this.check(row, col - 2) === "") newSquares[row][col-2] = "highlighted_grass.png"
        if (this.check(row, col - 1) === "") newSquares[row][col-1] = "highlighted_grass.png"
        if (this.check(row, col + 1) === "") newSquares[row][col+1] = "highlighted_grass.png"
        if (this.check(row, col + 2) === "") newSquares[row][col+2] = "highlighted_grass.png"
        if (this.check(row + 1, col + 1) === "") newSquares[row + 1][col + 1] = "highlighted_grass.png"
        if (this.check(row + 1, col) === "") newSquares[row + 1][col] = "highlighted_grass.png"
        if (this.check(row + 1, col - 1) === "") newSquares[row + 1][col - 1] = "highlighted_grass.png"
        if (this.check(row + 2, col) === "") newSquares[row + 2][col] = "highlighted_grass.png"
        this.setState({
            squares: newSquares,
            mode: "move",
            selected: {row: row, col: col}
        })
    }

    render() {
        return (
            <div>
                <div style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${this.rows}, 50px)`,
                    gridTemplateColumns: `repeat(${this.cols}, 50px)`,
                    justifyContent: "center",
                }}>
                    {this.state.squares.map((element, row) => {
                        return element.map((el, col) => {
                            switch (this.state.mode) {
                                case "static": return (
                                    <Square tile={el} lit={this.isLit(row, col)} key={`${row},${col}`} row={row} col={col}>
                                        {this.getUnit(row, col)}
                                    </Square>)
                                case "move": return (
                                    <Square move={this.move} tile={el} lit={this.isLit(row, col)} key={`${row},${col}`} row={row} col={col}>
                                        {this.getUnit(row, col)}
                                    </Square>);
                                default: break;
                            }
                        })
                    })}
                </div>
            </div>
        )
    }
}

export default Board;