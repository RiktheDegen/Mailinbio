import React, {useContext, useState, useEffect} from 'react';
import firebase from 'firebase/compat';
import {Container, Form, Button, Row, Col, FormGroup, Label, Input, Card,CardBody, CardHeader, CardFooter,Spinner } from 'reactstrap';
import {readAndCompressImage} from 'browser-image-resizer';
import {imageConfiguration} from './config'
import {MdAddCircularOutline} from 'react-icons/md'
import {v4} from 'uuid'

import { ContactContext } from " ../context/Context";
import { CONTACT_TO_UPDATE } from " ../context/action.types";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
//destructuring state and dispatch from context. state
const { state, dispatch } = useContext (ContactContext)
const { contactToUpdate, contactToUpdatekey } = state;
// history hooks from react router dom to send to
const history = useHistory();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [address, setAddress] = useState ("");
const [isUploading, setIsUploading] = useState(false);
const [downloadUrt, setDownloadUrl] = useState(null);
const [star, setStar] = useState(false);
const [isUpdate, setIsUpdate] = useState(false);

useEffect (() => {
if (contactToUpdate) {
setName(contactToUpdate.name);
setEmail(contactToUpdate.email);
setPhoneNumber(contactToUpdate.phoneNumber);
setAddress(contactToUpdate.address);
setStar(contactToUpdate.star);
setDownloadUrl(contactToUpdate.picture);

setIsUpdate(true);
}
},
[contactToUpdate]);

}

export default AddContact