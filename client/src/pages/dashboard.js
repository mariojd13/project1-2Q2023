import React, { Component, useState } from 'react';
import { getCategories } from "../services/typeStervice";
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';


class Dashboard extends Component {

    state = {
        showModal: false, // Estado para controlar la apertura y cierre del modal principal
        showEditModal: false, // Estado para controlar la apertura y cierre del modal de edición
        form: {
            name: '',
            type_id: '',
            type_name: '',
            input: '',
            instructions: '',
            temperature: 0,
        },
        types: [],
    };

    componentDidMount() {
        this.getCategories();
    }

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

    getCategories = async () => {
        try {
            const { data, error } = await getCategories();
            if (!error) {
                this.setState({ types: data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleInputTypeChange = (e) => {
        const typeId = e.target.value;
        const typeName = e.target.options[e.target.selectedIndex].text;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                type_id: typeId,
                type_name: typeName
            },
        }));
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica para enviar los datos del formulario
        console.log(this.state.form);
    };

    render() {
        const { showModal, types } = this.state;
        return (

            <div className="flex">
                <div className="sliderbar-wrapper" style={{ width: '250px', position: 'relative', zIndex: 1 }}>
                    <Navbar />
                    <Sliderbar />
                </div>
                <div className="flex-1 px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center flex">
                            {/* Sección 1: Add */}
                            <button
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1 flex flex-col items-center justify-center"
                                title="New"
                                onClick={this.handleOpenModal} // Agregamos el evento onClick para abrir el modal
                            >
                                <h1 className="text-2xl font-semibold mb-2 text-center">Add</h1>
                                <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                {/* Contenido de la sección Add */}
                            </button>

                            {/* Sección 2: Edit */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./editPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-semibold mb-2 text-center">Edit</h1>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                    {/* Contenido de la sección Edit */}
                                </a>
                            </div>


                            {/* Sección 3: Images */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./imagePrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Images</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                                {/* Contenido de la sección Images */}
                            </div>
                            {/* Sección 4: Otros */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./completitionsPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Completitions</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                                {/* Contenido de la sección Otros */}
                            </div>
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                <h3 className="text-2xl font-semibold mb-6">Adding New Prompt</h3>
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={this.state.form.name}
                                                onChange={this.handleInputChange}
                                                required
                                                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                                                Type <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="type_id"
                                                id="type_id"
                                                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.type_id}
                                                onChange={this.handleInputTypeChange}
                                            >
                                                <option value={0}>Select Type</option>
                                                {this.state.types.map((type) => (
                                                    <option key={type._id} value={type._id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="input" className="block text-gray-700 text-sm font-bold mb-2">
                                                Input <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="input"
                                                name="input"
                                                value={this.state.form.input}
                                                onChange={this.handleInputChange}
                                                required
                                                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            ></textarea>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">
                                                Instructions <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="instructions"
                                                name="instructions"
                                                value={this.state.form.instructions}
                                                onChange={this.handleInputChange}
                                                required
                                                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="temperature" className="block text-gray-700 text-sm font-bold mb-2">
                                                Temperature
                                            </label>
                                            <input
                                                type="number"
                                                id="temperature"
                                                name="temperature"
                                                value={this.state.form.temperature}
                                                onChange={this.handleInputChange}
                                                className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 ml-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                                            onClick={this.handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>



        )
    }


}
export default Dashboard;
