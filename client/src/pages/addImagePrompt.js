import React, { Component } from 'react';
import Navbar from "../comun/navbar";
import { getCategories } from '../services/typeStervice';

class addImagePrompt extends Component {
  state = {
    data: [],
    form: {
      prompt_name: "",
      category_id: "",
      short_description: "",
      instructions: "",
    },
    categories: [],
    tags: [],
    tagInput: "",
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    try {
      const { data, error } = await getCategories();
      if (!error) {
        this.setState({ categories: data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const categoryName = e.target.options[e.target.selectedIndex].text;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        category_id: categoryId,
        category_name: categoryName
      },
    }));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddTag = () => {
    const { tagInput } = this.state;
    if (tagInput.trim() !== "") {
      const formattedTag = "#" + tagInput.trim();
      this.setState((prevState) => ({
        tags: [...prevState.tags, formattedTag],
        tagInput: ""
      }));
    }
  };

  render() {
    const { tags, tagInput } = this.state;

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
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                      Category
                    </label>
                    <select
                      name="category_id"
                      id="category_id"
                      className="block w-full border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      value={this.state.form.category_id}
                      onChange={this.handleCategoryChange}
                    >
                      <option value={0}>Select a category</option>
                      {this.state.categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
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
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      <input
                        className="w-full px-2 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        name="tagInput"
                        value={tagInput}
                        onChange={this.handleInputChange}
                        placeholder="Add a tag"
                      />
                      <button
                        className="ml-2 px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
                        onClick={this.handleAddTag}
                      >
                        Add
                      </button>
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

export default addImagePrompt;
