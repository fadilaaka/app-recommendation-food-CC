import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddArticle() {
  const [judul, setJudul] = useState("");
  const [dataKategori, setDataKategori] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [articleCategoryId, setArticleCategoryId] = useState();
  const [status, setStatus] = useState();

  const url = "http://localhost:5000";

  useEffect(() => {
    getArticleCategory();
  }, []);

  const getArticleCategory = async () => {
    const result = await axios.get(`${url}/api/v1/admin/get-article-category`);
    console.log(result);
    setDataKategori(result.data);
  };

  const submitData = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("updateTitle", judul);
    // formData.append("updateAuthor", penulis);
    // formData.append("updatePublisher", penerbit);
    // formData.append("updatePublishDate", tanggal);
    // formData.append("updateIsbn", isbn);
    // formData.append("updatePageCount", jumlah);
    // formData.append("updateDescription", description);
    // formData.append("updateIdKategori", idKategori);

    axios
      .post(`${url}/api/v1/admin/add-article`, {
        title: judul,
        articleCategoryId: articleCategoryId,
        image: image,
        description: description,
      })
      .then((res) => {
        console.log(res);
        setStatus(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-6 py-4 mt-6 mx-auto overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={(e) => submitData(e)} encType="multipart/form-data">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Title
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Article Category
            </label>
            <select
              className="border border-black rounded"
              name="articleCategoryId"
              id="articleCategoryId"
              value={articleCategoryId}
              onChange={(e) => setArticleCategoryId(e.target.value)}
              required
            >
              <option>--- Choose Category ---</option>
              {dataKategori.category &&
                dataKategori.category.map((item, index) => {
                  return (
                    <option key={index} value={`${item.id}`}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="image"
              id="image"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Image
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className="block mb-2 text-sm font-medium text-gray-500">
              Description
            </label>
            <CKEditor
              id="description"
              name="description"
              editor={ClassicEditor}
              data={description}
              onReady={(editor) => {
                console.log("Editor running");
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>

          <button
            type="submit"
            onClick={submitData}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {status === 201 ? (
          <div
            className="mx-auto fixed w-[25%] h-[10%] inset-0 flex items-center p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">Success add article</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AddArticle;
