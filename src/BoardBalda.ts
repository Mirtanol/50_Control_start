import { Board, BoardParam } from "./Board"
import { Sym } from "./Sym"

export class BoardBalda extends Board<GameBalda> {
    constructor(
        str: string | Sym<GameBalda>[] = "балда",
        init: boolean = true
    ) {
        const def = " ".repeat(10) + "балда" + " ".repeat(10)
        let cells: Sym<GameBalda>[]

        if (typeof str === "string") {
            let s = str
            if (s.length === 5) s = " ".repeat(10) + s + " ".repeat(10)
            if (s.length !== 25) s = def
            try {
                cells = new Array(25)
                for (let i = 0; i < 25; i++) cells[i] = new Sym<GameBalda>(s.charAt(i))
            } catch {
                cells = new Array(25)
                for (let i = 0; i < 25; i++) cells[i] = new Sym<GameBalda>(def.charAt(i))
            }
        } else {
            if (str.length === 5) {
                const pad = new Array(10)
                for (let i = 0; i < 10; i++) pad[i] = new Sym<GameBalda>(" ")
                cells = [...pad, ...str, ...pad]
            } else if (str.length === 25) {
                cells = [...str]
            } else {
                cells = new Array(25)
                for (let i = 0; i < 25; i++) cells[i] = new Sym<GameBalda>(def.charAt(i))
            }
        }

        super(
            cells,
            init ? BoardBaldaParam.row : undefined,
            init ? BoardBaldaParam.col : undefined
        )
    }
    
    clone(): BoardBalda {
        // TODO
        // Функция должна вернуть копию объекта
        // Если init, то дополнительно инициализируются
        //  статические поля класса
        return this
    }
}

export const BoardBaldaParam: BoardParam = {
    row: 5,
    col: 5
}