import React, { Component, useState } from 'react';
import Navbar from "../comun/navbar";

class Dashboard extends Component {



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
                                            Type
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Tags
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Prompt 1
                                        </th>
                                        <td class="px-6 py-4">
                                            Edit
                                        </td>
                                        <td class="px-6 py-4">
                                            tag1 - tag2 
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Edit</a>
                                            |
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Delate</a>
                                        </td>
                                    </tr>
                                    <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Prompt 2
                                        </th>
                                        <td class="px-6 py-4">
                                            Other
                                        </td>
                                        <td class="px-6 py-4">
                                            tag1 - tag2
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Edit</a>
                                            |
                                            <a href="#" class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">Delate</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        )
    }


}
export default Dashboard;
