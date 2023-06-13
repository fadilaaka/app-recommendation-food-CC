import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";

const Users = () => {
  const [dataUser, setDataUser] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);

  // const url = "http://localhost:5000";
  const url = "https://nutrimenu-iwz5mppixq-et.a.run.app";

  useEffect(() => {
    setLoading(true);
    getApiViewUser();
    setDeleted(false);
  }, [deleted]);

  const getApiViewUser = async () => {
    const result = await axios.get(`${url}/api/v1/admin/get-users`);
    // console.log(result);
    setDataUser(result.data.users);
    setLoading(false);
  };

  const deleteUser = (idUser) => {
    axios
      .post(`${url}/v1/api/delete-user/${idUser}`)
      .then((res) => {
        // console.log(res);
        setDeleted(true);
        setModalConfirmDelete(false);
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
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "gender",
      selector: (row) => row.gender,
      sortable: true,
    },
  ];

  const data = dataUser;
  const ExpandableRowsDetail = ({ data }) => {
    return (
      <div>
        <ul>
          <li>id: {data.id}</li>
          <li>uuid: {data.uuid}</li>
          <li>email: {data.email} </li>
          <li>name: {data.name}</li>
          <li>gender: {data.gender}</li>
          <li>birthday: {data.birthday}</li>
          <li>weight: {data.weight}</li>
          <li>height: {data.height}</li>
          <li>budget: {data.budget}</li>
          <li>createdAt: {data.createdAt}</li>
          <li>updatedAt: {data.updatedAt}</li>
          <li>deletedAt: {data.deletedAt}</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="overflow-hidden border rounded-lg">
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
      </div>
    </div>
  );
};

export default Users;
