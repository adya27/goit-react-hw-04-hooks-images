import "./App.css";
import "./styles.css";
import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";

function App() {
  const [match, setMatch] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (search !== "") {
      // console.log("useEffect 1");
      fetch(
        `https://pixabay.com/api/?key=17537629-2ee3a1e1cfb1c48a1e1039472&q=${search}&image_type=photo&pretty=true&page=${page}&per_page=12`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.total === 0) {
            setStatus("rejected");
            notify();
          }
          return data;
        })
        .then((data) => {
          setMatch([...match, ...data.hits]);
        });

      setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  useEffect(() => {
    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  const notify = () => toast.error("Sorry, no matches :(");

  const onSubmit = (data, page) => {
    setStatus("pending");
    setSearch(data);
    setPage(1);
    setMatch([]);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const loadMore = () => {
    incrementPage();
  };

  const onClick = (data) => {
    setCurrentImg(data);
    toggleModal();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />

      <ToastContainer />

      <ImageGallery onClick={onClick} match={match} />

      {status === "pending" && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}

      {modal && <Modal closeModal={toggleModal} largeImageURL={currentImg} />}
      {match.length % 12 === 0 &&
        match.length !== 0 &&
        status !== "pending" && <Button loadMore={loadMore} />}
    </div>
  );
}

export default App;
