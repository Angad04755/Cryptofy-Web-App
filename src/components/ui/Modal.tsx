import { type ReactNode } from "react"

interface ModalProps {
    children: ReactNode
}
function Modal({ children }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 min-h-screen flex justify-center items-center z-1000">
            <div className="w-[350px] border-1 border-green-300 p-10 md:w-[400px] bg-green-700 text-white rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    )
}
export default Modal;