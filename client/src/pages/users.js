import React, { Component } from 'react';
import Navbar from "../comun/navbar";
import { getRoles } from '../services/rolService';
import { getUsers, updateUsers, deleteUsers } from '../services/userService';

class Users extends Component {

    state = {
        data: [],
        form: {
          first_name: "",
          last_name: "",
          role_id: "",
          is_active: false, // Campo de estado como un booleano
        },
        roles: [],
        showModal: false,
        selectedUser: null,
      };

    componentDidMount() {
        this.getUsers();
        this.getRoles();
        //this.updateUsers();
    }

    getUsers = async () => {
        try {
            const { error, data } = await getUsers();
            if (data) {
                this.setState({ data });
            }
        } catch (error) {
            console.log(error);
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
            is_active: is_active, // Actualizar el campo is_active usando el valor del usuario
          },
          initialForm: {
            first_name,
            last_name,
            role_id: role._id,
            role_name: role.name,
            is_active: is_active, // Actualizar el campo is_active usando el valor del usuario
          },
        });
      };
      

    handleCloseModal = () => {
        // Cerrar el modal
        this.setState({ showModal: false, selectedUser: null });

        // Actualizar el estado de los usuarios con el nuevo rol
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



// FUNCIONA PERO SIN EL CHECK BOX
    handleEditUser = async (e) => {
        e.preventDefault();
        const { selectedUser, form } = this.state;
        const updatedUser = { ...selectedUser, ...form, user: form.role_id };

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
      

//FUNCIONA PERO SIN EL CHECK BOX

handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : e.target.value;
  
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: inputValue,
        is_active: checked // Agregar esta línea para actualizar el campo is_active según el estado del checkbox
      },
    }));
  };
      

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
        const { showModal, selectedUser, roles } = this.state;

        return (
            <div className="container mx-auto centar">
                <Navbar />
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center"></div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                            <td className="px-6 py-4">{user.status}</td>
                                            <td className="px-6 py-4">{user.role.name}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                                                    onClick={() => this.handleOpenModal(user)}
                                                >
                                                    Edit
                                                </button>
                                                |
                                                <button
                                                    className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                                                    onClick={() => this.handleDeleteUser(user)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {showModal && selectedUser && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-8">
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_active">
                                        Status
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        id="is_active"
                                        className="mr-2 leading-tight"
                                        checked={this.state.form.is_active}
                                        onChange={this.handleInputChange}
                                    />
                                    <span className="text-sm">Active</span>
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
            </div>
        );
    }
}

export default Users;
