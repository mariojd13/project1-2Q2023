import { Component } from "react"

import { createUser } from '../services/userService';

class Signup extends Component {


    state = {
        countries: [],
        form:{
            first_name: '',
            last_name: '',
            email: '',
            password11: '',
            password12: '',
            role_id:'64a638139bdc2b6ce029d457',// Normal Rol

        }


    }

    postUser = async (e) => {
        e.preventDefault();
      
        this.setState({ isLoading: true });
      
        const form = {
          first_name: e.target.elements.first_name.value,
          last_name: e.target.elements.last_name.value,
          email: e.target.elements.email.value,
          password1: e.target.elements.password1.value,
          password2: e.target.elements.password2.value,
          role_id: '64a638139bdc2b6ce029d457', // Normal Rol
        };
      
        console.log("form.role_id");
        console.log(form.role_id);
      
        const result = await createUser(form);
      
        if (!result.error) {
          this.setState({ isLoading: false });
          alert("Se ha registrado correctamente");
          window.location.href = "/";
        }
      };
      

    render() {
        return (
            <div className="container mx-auto centar">
                <div className="flex justify-center px-12 my-12">
                    <div className="content-ce">
                        <div className="bg-white p-5 rounded-lg lg:rounded-l-none content-center">
                            <h3 className="pt-4 text-2xl text-center font-semibold">Welcome to Prompts IA</h3>

                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={this.postUser} method="POST">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="password" name="password1" id="password1" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="password1" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="password" name="password2" id="password2" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="password2" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm assword</label>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text" name="first_name" id="first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text" name="last_name" id="last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                    </div>
                                </div>

                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="sumbit"
                                    >
                                        Register
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                                        type="sumbit"
                                    >
                                        <a href="./">
                                            Back
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
export default Signup;