import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetUser() {

    return axios
      .get("https://werkapp-server.com/user/Profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });

};

