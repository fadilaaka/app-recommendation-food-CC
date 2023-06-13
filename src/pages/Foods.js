import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const Foods = () => {
  const [dataFood, setDataFood] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

  const [status, setStatus] = useState();
  const [showStatus, setShowStatus] = useState(false);

  const url = "http://localhost:8080";
  // const url = "https://nutrimenu-iwz5mppixq-et.a.run.app";

  useEffect(() => {
    setLoading(true);
    getApiViewFoods();
    setDeleted(false);
  }, [deleted]);

  const getApiViewFoods = async () => {
    const result = await axios.get(`${url}/api/v1/admin/get-foods`);
    console.log(result);
    setDataFood(result.data.foods);
    setLoading(false);
  };

  const deleteFood = (idFood) => {
    axios
      .post(`${url}/api/v1/admin/delete-food/${Number(idFood)}`)
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
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "tags",
      selector: (row) => row.foodTagsOnFood[0].foodTags.name,
      sortable: true,
    },
    {
      name: "calories",
      selector: (row) => row.foodDetail[0].calories,
      sortable: true,
    },
    {
      name: "carbohidrat",
      selector: (row) => row.foodDetail[0].carbohidrat,
      sortable: true,
    },
    {
      name: "fat",
      selector: (row) => row.foodDetail[0].fat,
      sortable: true,
    },
    {
      name: "protein",
      selector: (row) => row.foodDetail[0].protein,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const data = dataFood;
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
            <b>Name</b>: {data.name}{" "}
          </li>
          <li>
            <b>Tags</b>: {data.foodTagsOnFood[0].foodTags.name}{" "}
          </li>
          <li>
            <b>Calories</b>: {data.foodDetail[0].calories}{" "}
          </li>
          <li>
            <b>Carbohidrat</b>: {data.foodDetail[0].carbohidrat}{" "}
          </li>
          <li>
            <b>Fat</b>: {data.foodDetail[0].fat}{" "}
          </li>
          <li>
            <b>Protein</b>: {data.foodDetail[0].protein}{" "}
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
            <b>Price</b>: {data.price}{" "}
          </li>
          <li>
            <b>Status</b>: {data.status}
          </li>
          <li>
            <b>Description</b>: {data.description}
          </li>
          <li>
            <b>Recipe</b>: {data.foodRecipe[0].description}
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
          <Link to={`/edit-food/${data.id}`}>
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
          <h1 className="text-lg font-bold m-4">Data Foods</h1>
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
        <Link to={`/add-food`}>
          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mx-4 my-4">
            <div className="flex justify-between items-center">
              <FaPlus />
              Add Food
            </div>
          </button>
        </Link>
      </div>
      <Modal
        modal={modalConfirmDelete}
        title={selectedTitle}
        id={selectedId}
        onClose={closeModal}
        onDelete={deleteFood}
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

export default Foods;
