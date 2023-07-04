import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inboxAction } from "../Store/Inbox-redux";

const useFetch = ({ url, type }) => {
    const dispatch = useDispatch();
    const userEmail = localStorage.getItem("email");
    const UserEmail = userEmail.replace(/[.@]/g, "");

    useEffect(async() => {
        const response = await axios.get(`${url}/${UserEmail}/${type}.json`);
        try {
            const data = response.data;
            const allKeys = Object.keys(data);
            const allValues = Object.values(data);
            allValues.forEach((item, index) => {
                 const itemKey = allKeys[index];
                 item.id = itemKey;
            })

            if (type === "Inbox") dispatch(inboxAction.inboxEmails(allValues));
            else dispatch(inboxAction.sentBoxEmails(allValues));

        } catch (error) {
            console.log(error);
        }
  }, [url]);

  return "";
};

export default useFetch;
