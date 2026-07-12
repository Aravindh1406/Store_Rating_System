import Button from "./Button";

interface Props {
    page: number;
    onPrevious: () => void;
    onNext: () => void;
    disablePrevious?: boolean;
}

function Pagination({
    page,
    onPrevious,
    onNext,
    disablePrevious,
}: Props) {
    return (
        <div className="flex justify-end items-center gap-4 mt-6">

            <Button
                variant="secondary"
                disabled={disablePrevious}
                onClick={onPrevious}
            >
                Previous
            </Button>

            <span className="font-semibold">

                {page}

            </span>

            <Button
                onClick={onNext}
            >
                Next
            </Button>

        </div>
    );
}

export default Pagination;