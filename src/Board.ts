import { Sym } from "./Sym"

export type BoardParam = {
    row: number,
    col: number
  }

// Абстрактный класс доски
export abstract class Board<T extends GameType>{
    cells: Sym<T>[]

    static row: number
    static col: number

    constructor(
        str: Sym<T>[],
        row?: number,
        col?: number,
    ) {
        if (row != null) Board.row = row
        if (col != null) Board.col = col
        this.cells = [...str]
    }

    abstract clone(): Board<T>     

    isFill(): boolean {
        return this.cells.every((c) => c.sym !== "_" && c.sym !== " ")
    }

    move(index: number, sym: Sym<T>): boolean {
        if (index < 0 || index >= this.cells.length) return false
        const curr = this.cells[index].sym
        if (curr !== "_" && curr !== " ") return false
        this.cells[index] = sym
        return true
    }

    status(): string { 
        return this.isFill() ? "Игра закончена" : "Идет игра"
    }

}
