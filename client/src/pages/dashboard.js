import React, { Component } from 'react';
import { getCategories } from "../services/typeService";
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';

class Dashboard extends Component {
    state = {
        showModal: false,
        showEditModal: false,
        modalType: '',
        selectedType: '',
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
        this.setState({
            showModal: true,
            showEditModal: false,
            modalType: '',
        });
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
    };

    handleInputTypeChange = (e) => {
        const typeId = e.target.value;
        const typeName = e.target.options[e.target.selectedIndex].text;
        let modalType = '';
      
        switch (typeName) {
          case 'Image':
            modalType = 'modalImage';
            break;
          case 'Edit':
            modalType = 'modalEdit';
            break;
          case 'Completitions':
            modalType = 'modalCompetitions';
            break;
          default:
            break;
        }
      
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            type_id: typeId,
            type_name: typeName,
          },
          modalType,
        }));
      };
      

      handleAcceptType = () => {
        const { selectedType } = this.state;
        let modalType = '';
    
        switch (selectedType) {
          case 'Image':
            modalType = 'modalImage';
            this.props.history.push('/addImagePrompt'); // Redirección a la página addImagePrompt
            break;
          case 'Edit':
            modalType = 'modalEdit';
            break;
          case 'Completitions':
            modalType = 'modalCompetitions';
            break;
          default:
            break;
        }
    
        this.setState({
          showModal: true,
          showEditModal: false,
          modalType,
        });
      };
      

    render() {
        const { showModal, types, modalType, selectedType } = this.state;
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
                                onClick={this.handleOpenModal}
                            >
                                <h1 className="text-2xl font-semibold mb-2 text-center">Add</h1>
                                <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                            </button>

                            {/* Sección 2: Edit */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./editPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-semibold mb-2 text-center">Edit</h1>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                            </div>

                            {/* Sección 3: Images */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./imagePrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Images</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                            </div>
                            {/* Sección 4: Otros */}
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./completitionsPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Completitions</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                            {selectedType === '' ? (
                                // Renderiza el modal de selección de tipo
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    <h3 className="text-2xl font-semibold mb-6">Select a Type</h3>
                                    <select
                                        name="type"
                                        id="type"
                                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 mb-4"
                                        value={this.state.form.type_id}
                                        onChange={this.handleInputTypeChange}
                                    >
                                        <option value="">Select Type</option>
                                        {/* Renderiza las opciones de tipo disponibles */}
                                        {types.map((type) => (
                                            <option key={type._id} value={type._id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex justify-end">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                            onClick={this.handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 ml-2" // Añade ml-2 para el espacio
                                            onClick={this.handleAcceptType}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Renderiza el modal correspondiente al tipo seleccionado
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
