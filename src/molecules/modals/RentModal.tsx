"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Categories from "@molecules/categories/Categories/Categories";
import Heading from "@molecules/heading/Heading";
import Input from "@molecules/inputs/Input";
import useRentModal from "@custom-hooks/useRentModal";
// otros input pendientes

const RentModal = () => {
  return <div>Hello am RentModal!</div>;
};

export default RentModal;
