import React from "react";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  styles?: string;
  children?: JSX.Element | JSX.Element[];
};

const BaseModal = (props: Props) => {
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-background" />
      <div className={`modal ${props.styles}`}>{props.children}</div>
    </>,
    document.getElementById("portal")!
  );
};

export default BaseModal;
