import React, { Component, useState } from 'react';
import Navbar from "../comun/navbar";

class Add extends Component {



    render() {



        return (
            <div className="container mx-auto centar">
              <Navbar></Navbar>
              <div className="px-4 py-8 lg:px-12">
                <div className="bg-white rounded-lg shadow-lg">
                  <h3 className="pt-4 text-2xl text-center font-semibold">Adding a New Prompt...</h3>
                  <form className="px-8 pt-8 pb-8 mb-4" onSubmit={this.postSession} method="POST">
                    <div className="mb-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-6">
                          <label className="block mb-3 text-sm font-bold text-gray-700">
                            Prompt Name
                          </label>
                          <input
                            className="w-full px-2 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="name"
                            type="name"
                            placeholder="Prompt Name"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-3 text-sm font-bold text-gray-700">
                            Type
                          </label>
                          <select
                            className="w-full px-2 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="type"
                          >
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                            <option value="type3">Type 3</option>
                          </select>
                        </div>
                        <div className="mb-6">
                          <label className="block mb-3 text-sm font-bold text-gray-700">
                            Short Description
                          </label>
                          <textarea
                            className="w-full h-32 px-2 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Short Description"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-3 text-sm font-bold text-gray-700">
                            Instructions
                          </label>
                          <textarea
                            className="w-full h-32 px-2 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="instructions"
                            placeholder="Instructions"
                          />
                        </div>
                      </div>
                      <div className="mb-12">
                        <label className="block mb-3 text-sm font-bold text-gray-700">
                          Tags
                        </label>
                        <div className="border border-gray-300 rounded p-2">
                          <div className="flex flex-wrap">
                            <span className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700">Tag 1</span>
                            <span className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700">Tag 2</span>
                            <span className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700">Tag 3</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full md:w-1/2 mb-6 md:mb-0">
                          <div className="mb-6">
                            <button
                              className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Add Prompt
                            </button>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 mb-6 md:mb-0">
                          <div className="mb-6">
                            <button
                              className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              <a href="/dashboard">
                                Cancel
                              </a>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
          

    }


}
export default Add;
