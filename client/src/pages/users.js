import React, { Component, useState } from 'react';
import Navbar from "../comun/navbar";
import { getRoles } from '../services/rolService';
import { getUsers } from '../services/userService';

class Users extends Component {

    state = {
        data: [],

        form: {
            first_name: "",
            last_name: "",
            role_id: "",
            //category_id: "",
        },
        roles: [],
        //user:[],
    };

    componentDidMount() {
        this.getUsers();
        this.getRoles();


    }

    // getUsers = async () => {
    //     this.setState({ isLoading: true });
    //     const { data, error } = await getUsers()

    //     if (data) {
    //         this.setState({ data: data })
    //     }
    //     this.setState({ isLoading: false });
    // }

    getUsers = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getUsers()
        //console.log(data);
        if (data) {
            this.setState({ data })
        }
        this.setState({ isLoading: false });
    }

    getRoles = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getRoles();
        if (!error) {

            this.setState({ roles: data })
        }
        this.setState({ isLoading: false });
    }

    handleOpenModal = (category, e) => {
        this.handleModal();
        var categoryName = document.getElementById("edit_name");
        categoryName.value=category.name;
        this.state.form._id=category._id;      
    }



    render() {



        return (

            <div className="container mx-auto centar">
                <Navbar />
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center"></div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Last Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Rol
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {this.state.data.map((user) => {
                                                return (
                                                    <tr>
                                                        <td>{user.first_name}</td>
                                                        <td>{user.last_name}</td>
                                                        <td>{user.role}</td>
                                                    </tr>
                                                );
                                            })}
                                        </th>
                                        <td class="px-6 py-4">
                                            Edit
                                        </td>
                                        <td class="px-6 py-4">
                                            tag1 - tag2
                                        </td>
                                        <td class="px-6 py-4">
                                            <select value={this.state.rol_id} onChange={this.selectroles}>
                                                <option key={0} value={0}>
                                                    Seleccione una opción
                                                </option>
                                                {this.state.roles.map((rol) => (
                                                    <option key={rol._id} value={rol._id}>
                                                        {rol.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Edit</a>
                                            |
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Delate</a>
                                        </td>
                                    </tr>
                                </tbody> */}
                                <tbody>
                                        {this.state.data?.map(user => {
                                            return (

                                                <tr key={user._id}>
                                                    <td className='px-6 py-4'>{user.first_name}</td>
                                                    <td className='px-6 py-4'>{user.last_name}</td>
                                                    <td className='px-6 py-4'>{user.status}</td>
                                                    <td className='px-6 py-4'>{user.role.name}</td>
                                                    <td class="px-6 py-4">
                                            <a href="/editUser" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Edit</a>
                                            |
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Delate</a>
                                        </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        )
    }


}
export default Users;
