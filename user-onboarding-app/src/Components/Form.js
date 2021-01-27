import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Select, Input, Button, Checkbox, Box, Text } from "@chakra-ui/react";
import Validate from "../schema";

export default function Form(props) {
   const {
      formvalues,
      setFormvalues,
      setUsers,
      users,
      initialform,
      errors,
      setErrors,
   } = props;
   const [show, setShow] = useState(false);
   const [disabled, setDisabled] = useState(true);
   const [waiting, setWaiting] = useState(false);

   const inputChange = (e) => {
      let { name, value } = e.target;
      if (e.target.type === "checkbox") {
         value = e.target.checked;
      }
      yup.reach(Validate, name)
         .validate(value)
         .then((valid) => {
            setErrors({
               ...errors,
               [name]: "",
            });
         })
         .catch((err) => {
            setErrors({
               ...errors,
               [name]: err.errors[0],
            });
         });
      setFormvalues({
         ...setFormvalues,
         [name]: value,
      });
   };

   useEffect(() => {
      Validate.isValid(formvalues)
         .then((valid) => setDisabled(!valid))
         .catch((err) => {
            console.log(err);
         });
   }, [formvalues]);

   const submit = (e) => {
      if (users.find((i) => i.email === formvalues.email)) {
         alert("this email is already used");
         return;
      }
      setWaiting(true);
      axios
         .post("https://reqres.in/api/users", formvalues)
         .then((res) => {
            // console.log(res.data);
            setUsers(users.concat(res.data));
            setFormvalues(initialform);
            setWaiting(false);
         })
         .catch((err) => alert("error: " + err));
   };

   const update = (e) => {
      const { name, value } = e.target;
      inputChange(e);
      // if(e.target.)
      // console.log(e.target);
      if (e.target.type === "checkbox") {
         setFormvalues({ ...formvalues, [name]: e.target.checked });
         return;
      }
      setFormvalues({ ...formvalues, [name]: value });
   };

   if (waiting) {
      return <h1 className="waitingtext"> Sending data ... </h1>;
   } else {
      return (
         <form className="mainform">
            <Input
               name="name"
               placeholder="Name"
               onChange={(e) => update(e)}
               value={formvalues["name"]}
            />
            {errors.name.length > 0 && (
               <Text className="error">{errors.name}</Text>
            )}
            <Input
               name="email"
               placeholder="Email"
               onChange={(e) => update(e)}
               value={formvalues["email"]}
            />
            {errors.email.length > 0 && (
               <Text className="error">{errors.email}</Text>
            )}
            <Box marginRight="-4.2rem">
               <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => update(e)}
                  value={formvalues["password"]}
                  autoComplete="none"
               />
               <Button
                  w="4rem"
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow(!show)}
               >
                  {show ? "Hide" : "Show"}
               </Button>
            </Box>
            {errors.password.length > 0 && (
               <Text className="error">{errors.password}</Text>
            )}
            <Select
               margin="1vh"
               placeholder="Select position"
               width="24vw"
               onChange={(e) => update(e)}
               name="role"
               value={formvalues.role}
            >
               <option value="frontend">Frontend</option>
               <option value="backend">Backend</option>
               <option value="devops">DevOps</option>
            </Select>
            {errors.role.length > 0 && (
               <Text className="error">{errors.role}</Text>
            )}
            <Box padding="1%">
               <Box textAlign="center" display="flex">
                  <Text>I agree with the terms of service</Text>
                  <Checkbox
                     name="agreed"
                     marginLeft="10px"
                     onChange={(e) => update(e)}
                     checked={formvalues.agreed}
                     isChecked={formvalues.agreed}
                  />
               </Box>
            </Box>
            {errors.agreed.length > 0 && (
               <Text className="error">{errors.agreed}</Text>
            )}
            <Box>
               <Button onClick={(e) => submit(e)} disabled={disabled}>
                  Submit
               </Button>
            </Box>
         </form>
      );
   }
}
