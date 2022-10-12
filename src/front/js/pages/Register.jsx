import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Register = () => {

  let initialState = {
    email: "",
    password: ""
  };

  const { actions } = useContext(Context); /// vamos a crear la funcion de registro desde los acction( esta funcion pudiera estar en page por que solo se vera desde aqui)
  const [userRegister, setUserRegister] = useState(initialState);
  
  const handleChange = ({ target }) => {
    //para sincronizar los inputs 
    setUserRegister({
      ...userRegister,
      [target.name]: target.value,  ///aqui se hizo una destructuracion de event.target.name
    });
  };

  ///funcion para recibir los datos del usuraio y resgitarlo en base datos

  const handleSubmit = async (event) => {
    event.preventDefault(); //para evitar el burbujeo 
    if (userRegister.email.trim() != "" && userRegister.password.trim() != ""){ /// validacion para solictar inf a en los campos email Y password 
      console.log("registramos");
      let response = await actions.userRegister(userRegister);
      if(response){
      setUserRegister(initialState);
      alert("Successfully Registered")
      }
      else{
        alert("can't register")
      }

    }else {
      console.log("todos los campos son obligatorios")
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleChange}
          value={userRegister.email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handleChange}
          value={userRegister.password}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Register;
