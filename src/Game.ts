import { BoardParam } from "./Board"
import { SymError } from "./Error"
import { GameVC } from "./GameVC"
import { Input } from "./Input"
import { State } from "./State"

// Класс
export class Game<T extends GameType> {
    // Шаги игры
    steps: State<T>[]
    // Номер текущей игры    
    current: number
    // Параметры доски (размеры)    
    boardParam: BoardParam
    // интерфейс для пользовательского ввода    
    input: Input<T>

    constructor(
        steps: State<T>[] | State<T>,
        input: Input<T>,
        boardParam: BoardParam,
        current: number = 0
    ) {
        if (Array.isArray(steps))
            this.steps = steps
        else
            this.steps = [steps]
        this.current = current
        this.boardParam = boardParam
        this.input = input
    }

    get state(): State<T> {
        return this.steps[this.current]
    }

    clone(): Game<T> {
        const stepsCopy = this.steps.map((s) => s.clone())

        const inputCopy = Object.create(Object.getPrototypeOf(this.input)) as Input<T>
        Object.assign(inputCopy as any, this.input as any)

        return new Game(stepsCopy, inputCopy, { ...this.boardParam }, this.current)
    }

    move(index: number): boolean {
        if (this.state.board.status() !== "Идет игра") return false

        let sym: any
        try {
            sym = this.input.sym
        } catch (e) {
            if (e === SymError) alert("Неверный символ")
            else alert("Ошибка ввода")
            return false
        }

        const boardCopy = this.state.board.clone()
        if (!boardCopy.move(index, sym)) return false

        this.steps = this.steps.slice(0, this.current + 1)
        this.steps.push(new State(boardCopy, sym))
        this.current = this.steps.length - 1

        this.input.move()
        GameVC.draw()
        return true
    }

    toStep(step: number) {
        if (step < 0 || step >= this.steps.length) return false
        this.current = step

        const ctor = this.input.constructor as any
        const hasXO = ctor?.x != null && ctor?.o != null && (this.input as any)._sym !== undefined
        if (hasXO) {
            let x = 0
            let o = 0
            for (const c of this.state.board.cells) {
                if (c.sym === "X") x++
                else if (c.sym === "0") o++
            }
            ;(this.input as any)._sym = x <= o ? ctor.x : ctor.o
        }

        GameVC.draw()
        return true 
    }
}