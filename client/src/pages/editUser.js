import React, { Component, useState } from 'react';
import Navbar from "../comun/navbar";

import { getRoles } from '../services/rolService';
import { getUsers, updateUsers } from '../services/userService';



class Edit extends Component {


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

    getRoles = async () => {
        this.setState({ isLoading: true });
        const { data, error } = await getRoles();
        if (!error) {

            this.setState({ roles: data })
        }
        this.setState({ isLoading: false });
    }

    getUsers = async () => {
        this.setState({ isLoading: true });
        const { error, data } = await getUsers()
        //console.log(data);
        if (data) {
            this.setState({ data })
        }
        this.setState({ isLoading: false });
    }

    patchSource = async (e) => {
        e.preventDefault();
        this.state.form.first_name = e.target.first_name.value;
        this.state.form.last_name = e.target.last_name.value;
        this.state.form.role_id = e.target.rol_id.value;//set values to new form

        console.log("this.state.form");        
        console.log(this.state.form);
        

        const { error } = await updateUsers(this.state.form);// send data to upddate source
        if (!error) {
            alert("Source has been modified! sucessfully")
            this.handleModal();
            await this.gettingCategories();
            //await this.gettingSources();


        }
        this.setState({ isLoading: false });
    }


    render() {
        return (
            <div className="container mx-auto centar">
                <Navbar />
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <h3 className="pt-4 text-2xl text-center font-semibold">Editing the user</h3>

                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={this.patchSource} method="POST">
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" name="first_name" id="first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label for="first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <select class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={this.state.rol_id} onChange={this.selectroles}>
                                                <option key={0} value={0}>
                                                    Rol
                                                </option>
                                                {this.state.roles.map((rol) => (
                                                    <option key={rol._id} value={rol._id}>
                                                        {rol.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" name="last_name" id="last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <select class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={this.state.rol_id} onChange={this.selectroles}>
                                                <option key={0} value={0}>
                                                    Status
                                                </option>
                                                {this.state.roles.map((rol) => (
                                                    <option key={rol._id} value={rol._id}>
                                                        {rol.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            <a href="./users">Back</a>
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Edit;