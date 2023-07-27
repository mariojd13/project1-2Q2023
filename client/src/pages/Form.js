import React, { Component, useState } from 'react';
import { getSession } from '../services/sessionService';
import { saveSession } from '../services/sessionService';
import { getUsers, loginUser } from '../services/userService';
import { getRoles } from '../services/rolService';

class Form extends Component {


    state = {
        form: {
            email: '',
            password1: '',

        },
        isLoading: false,
    }
    componentDidMount() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }



    postSession = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
    
        const email = e.target.email.value;
        const password1 = e.target.password1.value;
        console.log("Email:", email);
        console.log("Password:", password1);
    
        try {
            const response = await saveSession({ email, password1 });
            console.log("Response from saveSession:", response);
            if (!response.error) {
                console.log("User logged in");
                console.log("Token:", response.data.token);
    
                // Almacenar el token en el local storage
                localStorage.setItem('token', response.data.token);
    
                // Mostrar una alerta de éxito
                alert('¡Inicio de sesión exitoso!');
    
                // Redirigir al editPrompt
                window.location.href = '/editPrompt';
            } else {
                console.log("Login failed");
                // Aquí podrías mostrar un mensaje de error al usuario en el formulario
            }
        } catch (error) {
            console.log("Error:", error);
            // Aquí también podrías mostrar un mensaje de error al usuario en el formulario
        }
    
        this.setState({ isLoading: false });
    };
    

      gettingSession = async () => {
        this.setState({ isLoading: true });
        const user=await getSession();
        
        await getRoles(user.data.role._id);
        
        this.setState({ isLoading: false });
    }
    

    render() {
        return (
            <div className="container mx-auto centar">
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <h3 className="pt-4 text-2xl text-center font-semibold">Welcome to Prompts IA</h3>
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
                                        id="password1"
                                        type="password"
                                        placeholder="Password"
                                        name="password1"
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Sign in
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="flex justify-center mb-3 inline-block text-sm text-yellow-500 align-baseline hover:text-yellow-600">
                                    If you don't have an account?
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="submit"
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

