import React, { Component, useState } from 'react';
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';
import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';
import AddImage from '../images/new.png';


class imagesPrompt extends Component {

    state = {
        showModal: false, // Estado para controlar la apertura y cierre del modal principal
        showEditModal: false, // Estado para controlar la apertura y cierre del modal de edición
        form: {
            name: '',
            type: '',
            input: '',
            instructions: '',
            temperature: 0,
        },
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleOpenEditModal = () => {
        this.setState({ showEditModal: true });
    };

    handleCloseEditModal = () => {
        this.setState({ showEditModal: false });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica para enviar los datos del formulario
        console.log(this.state.form);
    };

    render() {
        const { showModal, showEditModal } = this.state;
        return (

            <div className="flex">

                <div className="sliderbar-wrapper" style={{ width: '250px', position: 'relative', zIndex: 1 }}>
                    <Navbar /><Sliderbar />
                </div>
                <div className="flex-1 px-12 my-12">
                    <div className="content-ce">

                    <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center flex">
                            {/* Sección 1: Edit */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./editPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-semibold mb-2 text-center">Edit</h1>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                    {/* Contenido de la sección Edit */}
                                </a>
                            </div>
                            {/* Sección 2: Images */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./imagePrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Images</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                                {/* Contenido de la sección Images */}
                            </div>
                            {/* Sección 3: Otros */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./completitionsPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Completitions</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                                {/* Contenido de la sección Otros */}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tags
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Prompt 1
                                        </th>
                                        <td class="px-6 py-4">
                                            Edit
                                        </td>
                                        <td class="px-6 py-4">
                                            tag1 - tag2
                                        </td>
                                        <td class="px-6 py-4">
                                            <button
                                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                title="New"
                                                onClick={this.handleOpenModal} // Agregamos el evento onClick para abrir el modal
                                            >
                                                <img className="w-6 h-6" src={AddImage} alt="user photo" />
                                            </button>
                                            <button
                                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                title="Edit"
                                                onClick={this.handleOpenEditModal} // Agregamos el evento onClick para abrir el modal de edición
                                            >
                                                <img className="w-6 h-6" src={EditImage} alt="user photo" />
                                            </button>
                                            <button
                                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2" title="Delete"
                                            >
                                                <img className="w-6 h-6" src={DeleteImage} alt="user photo" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        {showEditModal && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    {/* Contenido del modal de edición */}
                                    <h3 className="text-2xl font-semibold mb-6">Editing Prompt </h3>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        onClick={this.handleCloseEditModal} // Agregamos el evento onClick para cerrar el modal de edición
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>


        )
    }


}
export default imagesPrompt;
