import type{
    InputHTMLAttributes
} from "react";

import {
    forwardRef,
} from "react";

interface Props
    extends InputHTMLAttributes<HTMLInputElement> {

    label?: string;

    error?: string;

}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            error,
            className = "",
            ...props
        },
        ref
    ) => {

        return (

            <div className="flex flex-col gap-1">

                {label && (

                    <label className="font-medium">

                        {label}

                    </label>

                )}

                <input

                    ref={ref}

                    {...props}

                    className={`border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}

                />

                {error && (

                    <span className="text-sm text-red-500">

                        {error}

                    </span>

                )}

            </div>

        );

    }
);

Input.displayName = "Input";

export default Input;