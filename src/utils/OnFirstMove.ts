import { Dash_OnUpdateFrame } from "../index"
import { Dash_Wait } from "../index"

const getPositionData = () => {
    let { feetPosition, position, rotation } = Camera.instance
    return JSON.stringify({ feetPosition, position, rotation })
}

export const Dash_OnFirstMove = (callback: () => void) => {
    Dash_Wait(() => { // Wait a second before getting position data
        const initialPosition = getPositionData()
        const onUpdateFrame = Dash_OnUpdateFrame.add(() => {
            const currentPositionData = getPositionData()
            if(initialPosition != currentPositionData) {
                callback()
                onUpdateFrame.stop()
            }
        }, { initialPosition })
    },1)
}
