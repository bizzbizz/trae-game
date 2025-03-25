export interface GamePopup {
    buttons: GameButton[]
    onClose: () => void
}

export interface GameButton {
    emoji: string
    tooltip: string
    popup?: GamePopup
    onClick?: () => void
    size?: {
        width: number
        height: number
    }
}

export interface GamePanel {
    buttons: GameButton[]
}

// Default button size constants
export const DEFAULT_BUTTON_SIZE = {
    width: 32,
    height: 32
}

// Tooltip delay in seconds
export const TOOLTIP_DELAY = 0.3