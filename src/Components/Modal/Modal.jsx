import { createPortal } from "react-dom";
import React, { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e) => {
    const { closeModal } = props;
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const onClickOverlay = (e) => {
    const { closeModal } = props;

    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { largeImageURL } = props;

  return createPortal(
    <div onClick={onClickOverlay} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
