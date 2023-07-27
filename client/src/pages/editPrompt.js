import React, { Component } from 'react';
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';
import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';
import AddImage from '../images/new.png';
import PlayImage from '../images/play.png';

import { getPromptEdits, updateEditPrompts, deleteEditPrompts, createEditPrompt } from '../services/editPromptService';
import { getCategories } from '../services/typeService';


class editsPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            form: {
                name: '',
                category_id: 'edit',
                input: '',
                instruction: '',
            },
            categories: [],
            selectedEditPrompt: null,
            showEditsModal: false,
        };
    };

    componentDidMount() {
        this.getPromptEdits();
        this.getCategories();
    }

    getPromptEdits = async () => {
        try {
            const { data, error } = await getPromptEdits();
            if (!error) {
                if (Array.isArray(data)) {
                    this.setState({ data }); // Actualizar el estado con los datos obtenidos
                } else {
                    this.setState({ data: [] }); // Si no hay datos, establecer un array vacío
                }
            } else {
                this.setState({ data: [] }); // Si hay un error, establecer un array vacío
            }
        } catch (error) {
            console.log(error);
            this.setState({ data: [] }); // En caso de error, establecer un array vacío
        }
    };


    getCategories = async () => {
        try {
            const { data, error } = await getCategories();
            if (!error) {
                this.setState({ categories: data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleOpenEditModal = (promptEdit) => {
        const { name, input, instruction } = promptEdit;
        this.setState({
            showEditsModal: true,
            selectedEditPrompt: promptEdit,
            form: {
                name,
                input,
                category_id: "image",
                instruction,
            },
            initialForm: {
                name,
                input,
                category_id: "image",
                instruction,
            },
        });
    };

    handleOpenNewEditModal = () => {
        this.setState({
            showNewEditsModal: true,
            form: {
                name: '',
                type: 'edit',
                input: '',
                instruction: '',

            },
            initialForm: {
                name: '',
                type: 'edit',
                input: '',
                instruction: '',
            },
        });
    };





    handleEditEditPrompt = async (e) => {
        e.preventDefault();
        const { selectedEditPrompt, form } = this.state;
        const updatedEditPrompt = {
            ...selectedEditPrompt,
            ...form,
            number: form.number,
        };

        const confirmation = window.confirm(
            `¿Está seguro que desea guardar los cambios para el prompt: ${selectedEditPrompt.name}?`
        );

        if (confirmation) {
            try {
                const { error, data } = await updateEditPrompts(updatedEditPrompt);
                if (data && !error) {
                    console.log("Prompt Edit updated:", data);
                    const updatedData = this.state.data.map((selectedEditPrompt) => {
                        if (selectedEditPrompt._id === data._id) {
                            return data;
                        }
                        return selectedEditPrompt;
                    });

                    this.setState({ data: updatedData });
                    this.handleCloseEditsModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    handleCloseEditsModal = () => {
        this.setState({ showEditsModal: false });
        this.setState({ showNewEditsModal: false });
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

    handleDeleteEditPrompt = async (promptEdit) => {
        const confirmation = window.confirm(`¿Está seguro que desea el siguiente prompt de: ${promptEdit.name}?`);
        if (confirmation) {
            try {
                const { error, msg } = await deleteEditPrompts(promptEdit._id);
                if (!error) {
                    alert(msg);
                    // Refrescar la página para mostrar los cambios actualizados
                    window.location.reload();
                } else {
                    alert(msg);
                }
            } catch (error) {
                console.log(error);
                alert('Error interno del servidor');
            }
        }
    }


    handleSizeChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    postEditPrompt = async (e) => {
        //const { form } = this.state;

        // e.preventDefault();

        // this.setState({ isLoading: true });

        const form = {
            name: e.target.elements.name.value,
            category_id: '64a6313cf8d7595ee0acf85f', // Type Image
            input: e.target.elements.input.value,
            instruction: e.target.elements.instruction.value,
            //size: e.target.elements.size.value,
            //n: e.target.elements.n.value,
        };

        console.log("form.category_id");
        console.log(form.category_id);

        const result = await createEditPrompt(form);

        if (!result.error) {
            this.setState({ isLoading: false });
            alert("Se ha registrado correctamente");
            window.location.href = "./editPrompt";
        }
    };



    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.form);
    };

    render() {
        const { showEditsModal, showNewEditsModal, selectedEditPrompt, form, data } = this.state;
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
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="font-semibold">Agregar nuevo prompt de tipo Edit</h2>
                            <p>Si usted desea agregar un nuevo prompt de tipo Edit, por favor, presione el siguiente botón:</p>

                            <button
                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mt-2"
                                title="New"
                                onClick={this.handleOpenNewEditModal} // Llama a la función postImagePrompt al hacer clic
                            >
                                <img className="w-6 h-6" src={AddImage} alt="user photo" />
                            </button>
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
                                            Prompt
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((promptEdit) => (
                                        <tr key={promptEdit._id}>
                                            <td className="px-6 py-4">{promptEdit.name}</td>
                                            <td className="px-6 py-4">{promptEdit.category && promptEdit.category.name}</td>
                                            <td className="px-6 py-4">{promptEdit.prompt}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    title="Run"
                                                    onClick={this.handleOpenEditModal} // Agregamos el evento onClick para abrir el modal
                                                >
                                                    <img className="w-6 h-6" src={PlayImage} alt="user photo" />
                                                </button>

                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    title="Edit"
                                                    onClick={() => this.handleOpenEditModal(promptEdit)}
                                                >
                                                    <img className="w-6 h-6" src={EditImage} alt="user photo" />
                                                </button>
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    onClick={() => this.handleDeleteEditPrompt(promptEdit)}
                                                >
                                                    <img className="w-6 h-6" src={DeleteImage} alt="user photo" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {showEditsModal && selectedEditPrompt && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    {/* Contenido del modal de edición */}
                                    <h3 className="text-2xl font-semibold mb-6">Editing Prompt</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="col-span-1">
                                            <label htmlFor="name" className="block font-medium mb-1">
                                                Name<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                                value={form.name}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="type" className="block font-medium mb-1">
                                                Type:
                                            </label>
                                            <select
                                                id="type"
                                                name="type"
                                                className="w-full border rounded-md px-3 py-2"
                                                defaultValue="image"
                                                disabled
                                            >
                                                <option value="Edit">Edit</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="input" className="block font-medium mb-1">
                                            Input<span className="text-red-500"> *</span>
                                        </label>
                                        <input
                                            id="input"
                                            name="input"
                                            type="text"
                                            className="w-full border rounded-md px-3 py-2"
                                            required
                                            value={form.input}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="instruction" className="block font-medium mb-1">
                                            Instruction<span className="text-red-500"> *</span>
                                        </label>
                                        <textarea
                                            id="instruction"
                                            name="instruction"
                                            className="w-full border rounded-md px-3 py-2"
                                            required
                                            value={form.instruction}
                                            onChange={this.handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                                            onClick={this.handleEditEditPrompt}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                            onClick={this.handleCloseEditsModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                        {showNewEditsModal && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">

                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    {/* Contenido del modal de edición */}
                                    <form onSubmit={this.postEditPrompt}>
                                        <h3 className="text-2xl font-semibold mb-6">Editing Prompt</h3>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="col-span-1">
                                                <label htmlFor="name" className="block font-medium mb-1">
                                                    Name<span className="text-red-500"> *</span>
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="w-full border rounded-md px-3 py-2"
                                                    required
                                                    value={form.name}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="type" className="block font-medium mb-1">
                                                    Type:
                                                </label>
                                                <select
                                                    id="type"
                                                    name="type"
                                                    className="w-full border rounded-md px-3 py-2"
                                                    defaultValue="image"
                                                    disabled
                                                >
                                                    <option value="Edit">Edit</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="input" className="block font-medium mb-1">
                                                Input<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="input"
                                                name="input"
                                                type="text"
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                                value={form.input}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="instruction" className="block font-medium mb-1">
                                                Instruction<span className="text-red-500"> *</span>
                                            </label>
                                            <textarea
                                                id="instruction"
                                                name="instruction"
                                                className="w-full border rounded-md px-3 py-2"
                                                required
                                                value={form.instruction}
                                                onChange={this.handleInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                                onClick={this.handleCloseEditsModal}
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
            </div>
        )
    }
}
export default editsPrompt;