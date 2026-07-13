import { ChangeEvent } from 'react'

interface IProps {
    edit?: boolean;
    handlerCancel: () => void;
    handleApply: () => void;
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
    error: string;
    values: {
        name: string;
        comment?: string | null;
    } | null;
}
const FormGarage = ({
    handlerCancel,
    handleApply,
    handleInput,
    error,
    values,
    edit,
}: IProps) => {
  return (
      <div className='flex flex-col mt-3 relative'>
          <button
              className="self-end text-gray-900"
              onClick={handlerCancel}
          >cancel</button>
          <span className='text-xs text-gray-500'>Input name:</span>
          <input
              className='
                w-full
                rounded-md
                border
                border-gray-300
                px-3
                py-2
                text-gray-900
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200'
              placeholder='please input name'
              name='name'
              type='text'
              value={values?.name ?? ''}
              onChange={handleInput}
          />
          <span className='text-xs text-gray-500 mt-2'>Input comment:</span>
          <input
              className='
                w-full
                rounded-md
                border
                border-gray-300
                px-3
                py-2
                text-gray-900
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200'
              placeholder='please input comment'
              name='comment'
              value={values?.comment ?? ''}
              type='text'
              onChange={handleInput}
          />
          <div className='h-5'>
              {error &&
                  <span className='text-red-400'>{error}</span>
              }
          </div>
          <button
              className=' 
                mt-2
                w-full
                rounded-md
                bg-blue-500
                p-2
                text-white
                transition-colors
                hover:cursor-pointer
                hover:bg-blue-600
                '
              onClick={handleApply}
          >
              {edit? 'edit garage' : 'create garage'}
          </button>
      </div>
  )
}

export default FormGarage