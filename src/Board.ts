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
        // TODO
        // Если ячейка this.cell[index] занята - возвращает false
        // Записывает в ячейку cell и возвращает true
        return true
    }

    status(): string { 
        // TODO
        // Если доска заполнена возвращает "Игра закончена"
        //   если игра не закончена, строку "Идет игра".
        return "Идет игра"
    }

}
