import { FC, useState } from 'react'
import {
  useAddPersonMutation,
  useGetPersonsDataQuery,
} from '../../services/person'

interface PersonListProps {}

const PersonList: FC<PersonListProps> = ({}) => {
  const { data: people, isFetching } = useGetPersonsDataQuery()
  const [addPerson, { isLoading }] = useAddPersonMutation()

  const [inputName, setInputName] = useState('')
  const [inputNumber, setInputNumber] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    addPerson({ name: inputName, number: inputNumber })
  }

  return (
    <div className='max-w-lg p-6 mx-auto mt-10 rounded-md shadow-md bg-neutral text-primary-content'>
      <h1 className='p-2 text-2xl font-bold border-b-4 border-primary-focus'>
        Add a New Person
      </h1>
      <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
        <div className='w-full form-control'>
          <label className='label'>
            <span className='font-semibold label-text text-primary-content'>
              What is your name?
            </span>
          </label>
          <input
            type='text'
            className='w-full input input-bordered'
            value={inputName}
            onChange={(e: any) => setInputName(e.target.value)}
          />
        </div>

        <div className='w-full form-control'>
          <label className='label'>
            <span className='font-semibold label-text text-primary-content'>
              What is your number?
            </span>
          </label>
          <input
            type='number'
            className='w-full input input-bordered'
            value={inputNumber}
            onChange={(e: any) => setInputNumber(e.target.value)}
          />
        </div>
        {isLoading ? (
          <button
            type='submit'
            className='block w-full btn btn-primary animate-bounce'
            disabled
          >
            Submitting...
          </button>
        ) : (
          <button type='submit' className='block w-full btn btn-primary'>
            Submit
          </button>
        )}
      </form>

      <h1 className='p-2 mt-4 text-2xl font-bold border-b-4 border-primary-focus'>
        Person List
      </h1>
      <div className='p-3 mt-5 space-y-2 font-semibold bg-base-300 '>
        {isFetching
          ? 'Fetching...'
          : people?.map((person) => (
              <article key={person.id} className='flex gap-3'>
                <p>Name: {person.name}</p>
                <p>Number: {person.number}</p>
              </article>
            ))}
      </div>
    </div>
  )
}
export default PersonList
