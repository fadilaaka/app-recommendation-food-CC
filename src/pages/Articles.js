import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const Articles = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

  const [status, setStatus] = useState();
  const [showStatus, setShowStatus] = useState(false);

  // const url = "http://localhost:5000";
  const url = "https://nutrimenu-iwz5mppixq-et.a.run.app";

  useEffect(() => {
    setLoading(true);
    getApiViewArticles();
    setDeleted(false);
  }, [deleted]);

  const getApiViewArticles = async () => {
    const result = await axios.get(`${url}/api/v1/admin/get-articles`);
    console.log(result);
    setDataArticle(result.data.articles);
    setLoading(false);
  };

  const deleteArticle = (idArticle) => {
    axios
      .post(`${url}/api/v1/admin/delete-article/${Number(idArticle)}`)
      .then((res) => {
        console.log(res);
        setDeleted(true);
        setModalConfirmDelete(false);
        setStatus(res);
        setShowStatus(true);

        setTimeout(() => {
          setShowStatus(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  const [selectedId, setSelectedId] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const openModal = (id, title) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setModalConfirmDelete(true);
  };

  const closeModal = () => {
    setModalConfirmDelete(false);
  };

  const columns = [
    {
      name: "uuid",
      selector: (row) => row.uuid,
      sortable: true,
    },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = dataArticle;
  const ExpandableRowsDetail = ({ data }) => {
    return (
      <div>
        <ul className="mx-4 my-4">
          <li>
            <b>id</b>: {data.id}
          </li>
          <li>
            <b>uuid</b>: {data.uuid}
          </li>
          <li>
            <b>Title</b>: {data.title}{" "}
          </li>
          <li>
            <b>Image</b>:{" "}
            <a
              className="text-sky-300 hover:underline hover:text-sky-500"
              target="_blank"
              href={data.image}
              rel="noreferrer"
            >
              {data.image}
            </a>
          </li>
          <li>
            <b>Status</b>: {data.status}
          </li>
          <li>
            <b>Article Category</b>: {data.articleCategory}
          </li>
          <li>
            <b>Description</b>: {data.description}
          </li>
          <li>
            <b>CreatedAt</b>: {data.createdAt}
          </li>
          <li>
            <b>UpdatedAt</b>: {data.updatedAt}
          </li>
          <li>
            <b>DeletedAt</b>: {data.deletedAt}
          </li>
        </ul>
        <div className="mx-4 my-4">
          <Link to={`/edit-article/${data.id}`}>
            <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mx-4">
              <div className="flex justify-between items-center">
                <FaPen />
                Edit
              </div>
            </button>
          </Link>
          <button
            type="button"
            onClick={() => openModal(parseInt(data.id), data.title)}
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
          >
            <div className="flex justify-between items-center">
              <FaTrashAlt />
              Delete
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-12 border-gray-200 dark:border-gray-700">
        <div className="overflow-hidden border rounded-lg">
          <h1 className="text-lg font-bold m-4">Data Articles</h1>
          {loading && <Loading />}
          <DataTable
            columns={columns}
            data={data}
            selectableRows
            responsive
            pagination
            expandableRows
            expandableRowsComponent={ExpandableRowsDetail}
          />
        </div>
        <Link to={`/add-article`}>
          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mx-4 my-4">
            <div className="flex justify-between items-center">
              <FaPlus />
              Add Article
            </div>
          </button>
        </Link>
      </div>
      <Modal
        modal={modalConfirmDelete}
        title={selectedTitle}
        id={selectedId}
        onClose={closeModal}
        onDelete={deleteArticle}
      />
      {showStatus && status && status.status === 201 ? (
        <div
          className="mx-auto fixed w-[25%] h-[10%] inset-0 flex items-center p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">{status.data.message}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Articles;
