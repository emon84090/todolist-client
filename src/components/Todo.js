import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from './Spinner';
import Todolist from './Todolist';


const Todo = () => {
    const [spinner, setSpinner] = useState(false);

    const { data, isLoading, refetch } = useQuery('todos', () => fetch(`http://localhost:5000/alltodos`).then((res) => res.json()))


    if (isLoading) {
        return <Spinner></Spinner>

    }

    const addtodo = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const title = e.target.title.value;
        const discription = e.target.discription.value;

        const todos = {
            title: title,
            discription: discription,
            complete: false
        }
        try {
            const { data } = await axios.post(`http://localhost:5000/tododata`, todos);
            if (data.insertedId) {
                alert("add done");
                e.target.reset();
                refetch();
            }
            setSpinner(false)
        } catch (err) {
            alert('something went wrong');
            setSpinner(false)
        }



    }
    return (
        <>
            <h2 className='text-center font-semibold text-2xl py-3'>Add Task</h2>
            <form onSubmit={addtodo} className='max-w-md w-full mx-auto mt-3'>
                <div className="mb-4">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Task Name</label>
                    <input required name='title' type="text" className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Task Discription</label>
                    <textarea required name='discription' className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "></textarea>

                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-24 h-11 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{spinner ? <i className='bx bx-loader-alt font-semibold animate-spin text-xl'></i> : 'Add Task'}</button>
            </form>

            <Todolist refetch={refetch} data={data}></Todolist>


        </>
    );
};

export default Todo;