import React, { Component, useState } from 'react';


class Form extends Component {


    state = {
        form: {
            email: '',
            password: '',

        }
    }
    componentDidMount() {

        //localStorage.removeItem('token');
        //localStorage.removeItem('expiration');

    }






    render() {
        return (
            <div className="container mx-auto centar">
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <h3 className="pt-4 text-2xl text-center font-semibold">Welcome back!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={this.postSession} method="POST">

                                <div className="mb-4">
                                    <label className="w-full px-12 py-2 mb-3 text-sm font-bold text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-12 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="w-full px-12 py-2 mb-3 text-sm font-bold text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-12 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="sumbit"
                                    >
                                        Sign in
                                    </button>
                                </div>
                                <hr className="mb-6 border-t"/>
                                <div className="flex justify-center mb-3 inline-block text-sm text-yellow-500 align-baseline hover:text-yellow-600">
                                    If you don't have an account?
                                </div>
                                <div className="mb-6 text-center">

                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="sumbit"
                                    >
                                        <a href="/signup">
                                            Sign up!
                                        </a>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Form;

