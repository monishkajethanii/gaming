import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const Load = () => {
    return (
        <main className=" ml-64 w-2/3 flex justify-center items-center h-24 bg-gray-500 mt-32">
            <div>
                <Spinner animation="grow" variant="danger"/>
            </div>
        </main>
    );
};

export default Load;
