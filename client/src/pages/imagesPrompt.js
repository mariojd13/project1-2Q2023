import React, { Component } from 'react';
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';
import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';
import AddImage from '../images/new.png';
import PlayImage from '../images/play.png';

import { getPromptImages, updateImagePrompts, deleteImagePrompts } from '../services/imagePromptService';
import { getCategories } from '../services/typeService';


class imagesPrompt extends Component {
    state = {
        data: [],
        form: {
            name: '',
            type: 'image',
            Prompt: '',
            number: '',
            size: '',
        },
        categories: [],
        selectedImagePrompt: null,
        showImagesModal: false,
    };

    componentDidMount() {
        this.getPromptImages();
        this.getCategories();
    }

    getPromptImages = async () => {
        try {
            const { data, error } = await getPromptImages();
            if (!error) {
                this.setState({ data });
            } else {
                this.setState({ data: [] });
            }
        } catch (error) {
            console.log(error);
            this.setState({ data: [] });
        }
    }

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

    handleOpenImageModal = (promptImage) => {
        const { name, prompt, n, size } = promptImage;
        this.setState({
            showImagesModal: true,
            selectedImagePrompt: promptImage,
            form: {
                name,
                prompt,
                type: "image",
                n,
                size,
            },
            initialForm: {
                name,
                prompt,
                type: "image",
                n,
                size,
            },
        });
    };



    handleEditImagePrompt = async (e) => {
        e.preventDefault();
        const { selectedImagePrompt, form } = this.state;
        const updatedImagePrompt = {
            ...selectedImagePrompt,
            ...form,
            number: form.number,
        };

        const confirmation = window.confirm(
            `¿Está seguro que desea guardar los cambios para el prompt: ${selectedImagePrompt.name}?`
        );

        if (confirmation) {
            try {
                const { error, data } = await updateImagePrompts(updatedImagePrompt);
                if (data && !error) {
                    console.log("Prompt Image updated:", data);
                    const updatedData = this.state.data.map((selectedImagePrompt) => {
                        if (selectedImagePrompt._id === data._id) {
                            return data;
                        }
                        return selectedImagePrompt;
                    });

                    this.setState({ data: updatedData });
                    this.handleCloseImagesModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    handleCloseImagesModal = () => {
        this.setState({ showImagesModal: false });
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

    handleDeleteImagePrompt = async (promptImage) => {
        const confirmation = window.confirm(`¿Está seguro que desea el siguiente prompt de: ${promptImage.name}?`);
        if (confirmation) {
            try {
                const { error, msg } = await deleteImagePrompts(promptImage._id);
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



    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.form);
    };

    render() {
        const { showImagesModal, selectedImagePrompt, form } = this.state;
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
                            <h2 className="font-semibold">Agregar nuevo prompt de tipo imagen</h2>
                            <p>Si usted desea agregar un nuevo prompt de tipo Imagen, por favor, presione el siguiente botón:</p>

                            <button
                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mt-2"
                                title="New"
                                onClick={this.handleOpenImageModal}
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
                                            Num Images
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((promptImage) => (
                                        <tr key={promptImage._id}>
                                            <td className="px-6 py-4">{promptImage.name}</td>
                                            <td className="px-6 py-4">{promptImage.type}</td>
                                            <td className="px-6 py-4">{promptImage.prompt}</td>
                                            <td className="px-6 py-4">{promptImage.n}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    title="Run"
                                                    onClick={this.handleOpenImageModal} // Agregamos el evento onClick para abrir el modal
                                                >
                                                    <img className="w-6 h-6" src={PlayImage} alt="user photo" />
                                                </button>

                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    title="Edit"
                                                    onClick={() => this.handleOpenImageModal(promptImage)}
                                                >
                                                    <img className="w-6 h-6" src={EditImage} alt="user photo" />
                                                </button>
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    onClick={() => this.handleDeleteImagePrompt(promptImage)}
                                                >
                                                    <img className="w-6 h-6" src={DeleteImage} alt="user photo" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {showImagesModal && selectedImagePrompt && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    {/* Contenido del modal de edición */}
                                    <h3 className="text-2xl font-semibold mb-6">Image Prompt</h3>
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
                                                value={form.name} // Agrega el atributo value para enlazarlo con el estado
                                                onChange={this.handleInputChange} // Agrega el evento onChange para actualizar el estado
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
                                                <option value="image">Image</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="prompt" className="block font-medium mb-1">
                                            Prompt<span className="text-red-500"> *</span>
                                        </label>
                                        <textarea
                                            id="prompt"
                                            name="prompt"
                                            className="w-full border rounded-md px-3 py-2"
                                            required
                                            value={form.prompt} // Agrega el atributo value para enlazarlo con el estado
                                            onChange={this.handleInputChange} // Agrega el evento onChange para actualizar el estado
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label htmlFor="n" className="block font-medium mb-1">
                                                Number<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                id="n"
                                                name="n"
                                                type="number" // Cambiar el tipo a "number"
                                                className="w-full border rounded-md px-3 py-2"
                                                value={form.n}
                                                onChange={this.handleInputChange} // Agregar el evento onChange para actualizar el estado
                                                style={{ width: '100%' }}
                                                min="1"
                                                max="2"
                                                step="1"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="size" className="block font-medium mb-1">
                                                Size:<span className="text-red-500"> *</span>
                                            </label>
                                            <select
                                                id="size"
                                                name="size"
                                                className="w-full border rounded-md px-3 py-2"
                                                value={form.size}
                                                onChange={this.handleSizeChange} // Agrega el evento onChange para actualizar el estado
                                            >
                                                <option value="256x256">256x256</option>
                                                <option value="512x512">512x512</option>
                                                <option value="1024x1024">1024x1024</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1"></div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                                            onClick={this.handleEditImagePrompt}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                            onClick={this.handleCloseImagesModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
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
