import {
    useFormContext
} from "react-hook-form";


import {
    useCheckoutStore
} from "../model/checkout.store";


import Switch from "./Switch";



export default function CommentBox() {


    const {
        register
    } = useFormContext();



    const {
        commentEnabled,
        setCommentEnabled
    } = useCheckoutStore();



    return (

        <div className="
            mt-6
            border
            rounded-xl
            p-5
        ">


            <div className="
                flex
                items-center
                justify-between
            ">


                <div className="
                    flex
                    gap-3
                    items-center
                ">

                    <span>
                        ✏️
                    </span>


                    <span className="
                        font-semibold
                        text-gray-900
                    ">
                        Коментар до замовлення
                    </span>


                </div>



                <Switch

                    checked={commentEnabled}

                    onChange={setCommentEnabled}

                />


            </div>



            {
                commentEnabled &&


                <textarea

                    {...register("comment")}

                    placeholder="
                        Ваш коментар...
                    "

                    className="
                        w-full
                        mt-4
                        min-h-[120px]
                        border
                        rounded-lg
                        p-3
                        text-gray-900
                    "

                />


            }



        </div>

    );
}