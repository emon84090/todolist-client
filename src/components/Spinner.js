import React from 'react';

const Spinner = () => {
    return (
        <>
            <div className="spinner flex justify-center h-12 items-center">
                <i className='bx text-blue-500 bx-loader-alt font-semibold animate-spin text-2xl'></i>
            </div>
        </>
    );
};

export default Spinner;