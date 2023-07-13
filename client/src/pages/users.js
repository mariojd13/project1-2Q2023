import React, { Component } from 'react';
import Navbar from "../comun/navbar";
import Sliderbar from '../comun/sliderbar';
import { getRoles } from '../services/rolService';
import { getUsers, updateUsers, deleteUsers } from '../services/userService';
import { getStatus } from '../services/statusService';
import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';

class Users extends Component {

    state = {
        data: [],
        form: {
            first_name: "",
            last_name: "",
            role_id: "",
            status_id: "", // Agregar la propiedad status_id en el estado
            is_active: false,
        },
        roles: [],
        statuss: [], // Agregar la propiedad statuss en el estado
        showModal: false,
        selectedUser: null,
    };

    componentDidMount() {
        this.getUsers();
        this.getRoles();
        this.getStatus();
    }

    getUsers = async () => {
        try {
            const { data, error } = await getUsers();
            if (!error) {
                this.setState({ data });
            } else {
                this.setState({ data: [] }); // Establecer un valor predeterminado para data en caso de error
            }
        } catch (error) {
            console.log(error);
            this.setState({ data: [] }); // Establecer un valor predeterminado para data en caso de error
        }
    }



    getRoles = async () => {
        try {
            const { data, error } = await getRoles();
            if (!error) {
                this.setState({ roles: data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleOpenModal = (user) => {
        const { first_name, last_name, role, status, is_active } = user;
        this.setState({
            showModal: true,
            selectedUser: user,
            form: {
                first_name,
                last_name,
                role_id: role._id,
                role_name: role.name,
                status_id: status.name, // Obtener el valor del status desde selectedUser
                status_name: status.name,
            },
            initialForm: {
                first_name,
                last_name,
                role_id: role._id,
                role_name: role.name,
                status_id: status.name, // Obtener el valor del status desde selectedUser
                status_name: status.name,
            },
        });
    };


    handleCloseModal = () => {
        // Cerrar el modal
        this.setState({ showModal: false, selectedUser: null });

        // Actualiza el estado de los usuarios con el nuevo rol
        const { data, selectedUser, form } = this.state;
        const updatedData = data.map((user) => {
            if (user._id === selectedUser._id) {
                return {
                    ...user,
                    role: {
                        _id: form.role_id,
                        name: form.role_name
                    }
                };
            }
            return user;
        });

        this.setState({ data: updatedData });
    }



    handleEditUser = async (e) => {
        e.preventDefault();
        const { selectedUser, form } = this.state;
        const updatedUser = {
            ...selectedUser,
            ...form,
            status: { name: form.status_id }, // Obtiene el valor actualizado del status
            //status: form.status_id,
            user: form.role_id
        };

        // Muesta mensaje de confirmación
        const confirmation = window.confirm(
            `¿Está seguro que desea guardar los cambios para el usuario: ${selectedUser.first_name}?`
        );

        if (confirmation) {
            try {
                const { error, data } = await updateUsers(updatedUser);
                if (data && !error) {
                    console.log("User updated:", data);
                    // Actualizar el estado de los datos
                    const updatedData = this.state.data.map((user) => {
                        if (user._id === data._id) {
                            return data;
                        }
                        return user;
                    });

                    this.setState({ data: updatedData });

                    // Cerrar el modal
                    this.handleCloseModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    handleRoleChange = (e) => {
        const roleId = e.target.value;
        const roleName = e.target.options[e.target.selectedIndex].text;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                role_id: roleId,
                role_name: roleName
            },
        }));
    }

    getStatus = async () => {
        try {
            const { data, error } = await getStatus(); // Obtener los status desde la base de datos
            if (!error) {
                this.setState({ statuss: data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }

    handleStatusChange = (e) => {
        const statusName = e.target.value;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                status_id: statusName,
                status_name: statusName
            },
        }));
    };


    handleDeleteUser = async (user) => {
        const confirmation = window.confirm(`¿Está seguro que desea borrar al usuario ${user.first_name} ${user.last_name}?`);
        if (confirmation) {
            try {
                const { error, msg } = await deleteUsers(user._id);
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


    render() {
        const { showModal, selectedUser, roles, statuss, showEditModal } = this.state;
    
        return (
            <div className="flex">
                <div className="sliderbar-wrapper" style={{ width: '250px', position: 'relative', zIndex: 1 }}>
                    <Navbar />
                    <Sliderbar />
                </div>
                <div className="flex-1 px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center flex">
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./editPrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-semibold mb-2 text-center">Edit</h1>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                    {/* Contenido de la sección Edit */}
                                </a>
                            </div>
                            <div className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex-1">
                                <a href="./imagePrompt" className="w-full h-full flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2 text-center">Images</h2>
                                    <h3 className="text-lg font-semibold mb-2 text-center">Prompts</h3>
                                </a>
                                {/* Contenido de la sección Images */}
                            </div>
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
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            E-mail
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4">{user.first_name}</td>
                                            <td className="px-6 py-4">{user.last_name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.status.name}</td>
                                            <td className="px-6 py-4">{user.role.name}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline mr-2"
                                                    onClick={() => this.handleOpenModal(user)}
                                                >
                                                    <img className="w-6 h-6" src={EditImage} alt="user photo" />
                                                </button>
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline ml-2"
                                                    onClick={() => this.handleDeleteUser(user)}
                                                >
                                                    <img className="w-6 h-6" src={DeleteImage} alt="user photo" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
    
                        {showModal && selectedUser && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    <h3 className="text-2xl font-semibold mb-6">Edit User</h3>
                                    <form onSubmit={this.handleEditUser}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.first_name}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.last_name}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.last_name}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role_id">
                                                Role
                                            </label>
                                            <select
                                                name="role_id"
                                                id="role_id"
                                                className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.role_id}
                                                onChange={this.handleRoleChange}
                                            >
                                                <option value={0}>Select a role</option>
                                                {roles.map((rol) => (
                                                    <option key={rol._id} value={rol._id}>
                                                        {rol.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status_id">
                                                Status
                                            </label>
                                            <select
                                                name="status_id"
                                                id="status_id"
                                                className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                                value={this.state.form.status_id}
                                                onChange={this.handleStatusChange}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                            </select>
                                        </div>
    
                                        <div className="flex justify-end">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                            <button
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
    
                        {showEditModal && (
                            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-8" style={{ width: '500px', height: 'auto', position: 'relative', zIndex: 1 }}>
                                    {/* Contenido del modal de edición */}
                                    <h3 className="text-2xl font-semibold mb-6">Editing Prompt</h3>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        onClick={this.handleCloseEditModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Users;