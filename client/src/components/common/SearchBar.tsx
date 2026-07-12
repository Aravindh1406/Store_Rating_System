import Input from "./Input";

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function SearchBar({
    value,
    onChange,
    placeholder,
}: Props) {
    return (
        <div className="w-80">

            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

        </div>
    );
}

export default SearchBar;