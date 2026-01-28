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
         // TODO
        // Проверяет, что в steps есть элемент с индексом step,
        //  если нет то возвращает false
        // Делает current равным step и обновляет свойство cell в board
        return true  
    }
}