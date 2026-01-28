import { Input } from "./Input"
import { Sym } from "./Sym"

export class InputBalda extends Input<GameBalda>{
    override get html(): string  {
        return "<input id='inputBalda'></input>"
    }

    get sym(): Sym<GameBalda> {
        const el = document.getElementById("inputBalda") as HTMLInputElement | null
        const val = el ? el.value : ""
        return new Sym<GameBalda>(val.trim().charAt(0))
    }

    move(): void {
        const el = document.getElementById("inputBalda") as HTMLInputElement | null
        if (el) el.value = ""
    }
}