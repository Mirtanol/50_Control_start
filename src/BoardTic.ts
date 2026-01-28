import { Board, BoardParam } from "./Board"
import { Sym } from "./Sym"
import { SymTic } from "./SymTic"

export class BoardTic extends Board<GameTic> {

    constructor(
        str: string | SymTic[] = "_________",
        init: boolean = true
    ) {
        const def = "_________"
        let cells: SymTic[]

        if (typeof str === "string") {
            let s = str
            if (s.length !== 9) s = def
            try {
                cells = new Array(9)
                for (let i = 0; i < 9; i++) cells[i] = new SymTic(s.charAt(i))
            } catch {
                cells = new Array(9)
                for (let i = 0; i < 9; i++) cells[i] = new SymTic(def.charAt(i))
            }
        } else {
            if (str.length !== 9) {
                cells = new Array(9)
                for (let i = 0; i < 9; i++) cells[i] = new SymTic(def.charAt(i))
            } else {
                cells = [...str]
            }
        }

        super(
            cells,
            init ? BoardTicParam.row : undefined,
            init ? BoardTicParam.col : undefined
        )
    }

    clone(): BoardTic {
        // TODO
        // Функция должна вернуть копию объекта
        // Если init, то дополнительно инициализируются
        //  статические поля класса
        return this
    }

    private getLineChar(line: number[]): string[] {
        return [
            this.cells[line[0]].sym,
            this.cells[line[1]].sym,
            this.cells[line[2]].sym,
        ]
    }

    private static winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    private checkWin() {
        // TODO
        // Если имеется комбинация из трех одинаковых символов "X" или "0" 
        //  в линию - возвращает этот символ
        // Иначе возвращает символ "_"
        return "_"
    }

    override status(): string {
        // TODO
        // возвращает либо строку с результатом игры, либо, 
        //   если игра не закончена, вызывает status родителя.
        return ""
    }
}

export const BoardTicParam: BoardParam = {
    row: 3,
    col: 3
}