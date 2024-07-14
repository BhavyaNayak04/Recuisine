import { useParams } from "react-router-dom";
import { useState } from "react";
import { search } from "../../constants";
import { Link } from "react-router-dom";
import Modal from "../Layout/Modal";
import Item from "../Items/Item";

export default function Inquire() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  if (!id) return null;
  const searchId = parseInt(id);
  const newSearch = search.filter((item) => item.id === searchId);

  return (
    <div className="container min-h-screen flex items-center space-y-8 text-justify">
      <div className="md:mt-10 mt-20" />
      {newSearch.map((item) => (
        <div
          className="p-3 container bg-white rounded-xl flex-col space-y-5 "
          key={item.id}
        >
          <Item item={item} />
          <Link to="#">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-green-300 rounded-lg mt-5"
            >
              {" "}
              Order
            </button>
            {showModal ? (
              <Modal>
                <div className="container space-y-3">
                  <h1 className="subheading">
                    Would you like to order this food?
                  </h1>
                  <p className="caption">
                    <span className="font-extrabold text-red-500">
                      Disclaimer:
                    </span>
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Recusandae molestiae, Eos sint saepe, doloribus expedita
                    ipsam dignissimos recusandae quis provident?
                  </p>
                  <div className="space-x-5">
                    <Link to="">
                      <button
                        className="px-5 py-2 bg-green-300 rounded-lg ml-auto"
                        onClick={() => setShowModal(false)}
                      >
                        Proceed
                      </button>
                    </Link>
                    <Link to=""></Link>
                  </div>
                </div>
              </Modal>
            ) : null}
          </Link>
        </div>
      ))}
    </div>
  );
}
