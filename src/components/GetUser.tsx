import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetUser() {

    return axios
      .get("http://werkappserver-env.eba-qyjsvfm3.us-east-1.elasticbeanstalk.com/user/Profile", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });

};

