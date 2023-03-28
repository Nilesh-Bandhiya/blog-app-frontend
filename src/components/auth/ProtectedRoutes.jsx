import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProtectedAdminRoute = (props) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {

    let token = JSON.parse(localStorage.getItem("userData"))

    if (!token || token?.role !== "admin") {
      setIsAdmin(false);
      return navigate('/signin');
    }
    setIsAdmin(true);
  }

  useEffect(() => {
    checkAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <Fragment>
      {
        isAdmin ? props.children : null
      }
    </Fragment>
  );
}


export const ProtectedLoginRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);


  const checkUser = () => {

    let token = JSON.parse(localStorage.getItem("userData"))

    if (!token || token === 'undefined') {
      setIsUser(false);
      return navigate('/signin');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}

export const ProtectedLogoutRoute = (props) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);


  const checkToken = () => {

    let token = JSON.parse(localStorage.getItem("userData"))

    if (token) {
      setIsUser(false);
      return navigate('/');
    }
    setIsUser(true);
  }

  useEffect(() => {
    checkToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <Fragment>
      {
        isUser ? props.children : null
      }
    </Fragment>
  );
}

export const ProtectedUserRoute = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const checkToken = () => {

    let token = JSON.parse(localStorage.getItem("userData"))


    if (token && token?._id !== params.userId ) {
      setIsCurrentUser(false);
      return navigate('/');
    }
    setIsCurrentUser(true);
  }

  useEffect(() => {
    checkToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUser]);

  return (
    <Fragment>
      {
        isCurrentUser ? props.children : null
      }
    </Fragment>
  );
}
