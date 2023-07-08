"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "@molecules/button/Button";
import ModalProps from "@molecules/modals/interfaces/modal.interface";

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled
}) => {

	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {

	}, []);

	const handleClose = () => {

	};

	const handleSubmit = () => {

	};

	return <div>Hello am Modal</div>;
};

export default Modal;
