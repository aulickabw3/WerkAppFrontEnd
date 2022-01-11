import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetUser() {

    return axios
      .get("http://localhost:3000/user/Profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });

};

