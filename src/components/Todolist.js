import axios from 'axios';
import React from 'react';

const Todolist = ({ data, refetch }) => {

    const deletefun = async (id) => {
        if (window.confirm("are you sure want to delete")) {
            try {
                const { data } = await axios.delete(`http://localhost:5000/delete/${id}`);
                if (data.deletedCount) {
                    alert("delete success");
                    refetch();
                }

            } catch (err) {
                alert('something went wrong');

            }

        }

    }

    const completefun = async (id) => {

        try {
            const { data } = await axios.put(`http://localhost:5000/alltodos/${id}`);
            if (data.modifiedCount) {
                alert("task completed");
                refetch();
            }

        } catch (err) {
            alert('something went wrong');

        }

    }


    return (
        <>
            <h2 className='text-center font-semibold mt-5 text-2xl py-3'>All Task</h2>

            <div className="tasktable max-w-3xl mt-5 w-full mx-auto py-7">

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    task title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    task details
                                </th>

                                <th colSpan="2" scope="col" className="px-6 py-3">
                                    <span >Operation</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {data.map((val, index) => <tr key={val._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <span className={val.complete && 'line-through'}>{val.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={val.complete && 'line-through'}> {val.discription
                                    }</span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => completefun(val._id)} className="font-medium text-green-500  hover:underline">complete</button>

                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => deletefun(val._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>

                                </td>
                            </tr>)}



                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
};

export default Todolist;