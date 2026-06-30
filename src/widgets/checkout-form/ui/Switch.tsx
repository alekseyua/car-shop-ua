interface Props {

    checked: boolean;

    onChange: (value: boolean) => void;

}


export default function Switch({
    checked,
    onChange
}: Props) {


    return (

        <button

            type="button"

            onClick={() =>
                onChange(!checked)
            }

            className={`
                relative
                w-12
                h-7
                rounded-full
                transition

                ${checked
                    ?
                    "bg-red-500"
                    :
                    "bg-gray-300"
                }

            `}

        >

            <span

                className={`
                    absolute
                    top-1
                    left-1
                    w-5
                    h-5
                    bg-white
                    rounded-full
                    transition-transform

                    ${checked
                        ?
                        "translate-x-5"
                        :
                        ""
                    }

                `}

            />


        </button>

    );

}