import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [inputValue, setInputValue] = useState(""); 
  const [Value, setValue] = useState("");
  const [otz, setOtz] = useState(""); 
  const [emai, setEmai] = useState(""); 
  const [tel, setTel] = useState(""); 
  const [pas, setPas] = useState("");  
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const handleSave = () => {
    setTimeout(() => {
      setInputValue("");
      setValue("");
      setOtz("");
      setEmai("");
      setTel("");
      setPas("");
    }, 1000);
  };
  return (
    <Box m="10px">
      <h2 style={{marginLeft: "500px", marginTop: "40px"}}>Создание пользователя</h2>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{marginLeft: "450px", marginTop: "40px"}}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >  
        
          
               
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <input
                value={inputValue}
                placeholder="Фамилия"
                onChange={(e) => setInputValue(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />
            <br/>
           
            <input
                value={Value}
                placeholder="Имя"
                onChange={(e) => setValue(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />
                <br/>
           
            <input
                value={otz}
                placeholder="Отчество"
                onChange={(e) => setOtz(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />
                <br/>
          
            <input
                value={emai}
                placeholder="Дата рождения"
                onChange={(e) => setEmai(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />
                <br/>
           
            <input
                value={tel}
                placeholder="Паспортные данные (без пробела)"
                onChange={(e) => setTel(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />
                <br/>
            
            <input
                value={pas}
                placeholder="Номер телефона"
                onChange={(e) => setPas(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />    
            <br/>
            <input
                value={pas}
                placeholder="Код занятия"
                onChange={(e) => setPas(e.target.value)}
                style={{width:'300px', height:'30px', marginLeft: "20px"}}
            />    
           
          </div>
           
                  
               
       {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Фамилия"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputValue}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 3" }}
              /> 
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Имя"
                onBlur={handleBlur}
                onChange={handleChange}
                value={Value}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 3" }}
              />   <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Отчество"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Name}
                name="Name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Номер телефона"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Паспортные данные"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 3" }}
              />  */}
          
            </Box>
            <Box /* display="flex" justifyContent="end" */ mt="20px" ml = "70px">
              <button onClick={handleSave}> Создать нового пользователя</button>
              
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Введите данные"),
  Name: yup.string().required("Введите данные"),
  lastName: yup.string().required("Введите данные"),
  email: yup.string().email("Неправильный email").required("Введите данные"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Неправильно введен номер")
    .required("Введите данные"),
  address1: yup.string().required("Введите данные"),
  address2: yup.string().required("Введите данные"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;
