import type { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

function Modal({
    open,
    title,
    children,
    onClose
}: ModalProps) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl">

                <div className="flex justify-between items-center border-b p-5">

                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default Modal;