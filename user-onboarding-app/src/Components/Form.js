import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Checkbox, Box, Text } from "@chakra-ui/react";
import Validate from "../schema";

export default function Form(props) {
   const { formvalues, setFormvalues, setUsers, users, initialform } = props;
   const [show, setShow] = useState(false);
   const [disabled, setDisabled] = useState(true);

   useEffect(() => {
      Validate.isValid(formvalues).then((valid) => setDisabled(!valid));
   }, [formvalues]);

   const submit = (e) => {
      if (users.find((i) => i.name === formvalues.name)) {
         alert("this user exists");
         return;
      }
      axios
         .post("https://reqres.in/api/users", formvalues)
         .then((res) => {
            // console.log(res.data);
            setUsers(users.concat(res.data));
            setFormvalues(initialform);
         })
         .catch((err) => alert("error: " + err));
   };

   const update = (e) => {
      const { name, value } = e.target;
      // if(e.target.)
      // console.log(e.target);
      if (e.target.type === "checkbox") {
         setFormvalues({ ...formvalues, [name]: e.target.checked });
         return;
      }
      setFormvalues({ ...formvalues, [name]: value });
   };

   return (
      <form className="mainform">
         <Input
            name="name"
            placeholder="Name"
            onChange={(e) => update(e)}
            value={formvalues["name"]}
         />
         <Input
            name="email"
            placeholder="Email"
            onChange={(e) => update(e)}
            value={formvalues["email"]}
         />

         <Box marginRight="-4.2rem">
            {" "}
            <Input
               pr="4.5rem"
               name="password"
               type={show ? "text" : "password"}
               placeholder="Enter password"
               onChange={(e) => update(e)}
               value={formvalues["password"]}
               autoComplete="none"
            />{" "}
            <Button
               w="4rem"
               h="1.75rem"
               size="sm"
               onClick={() => setShow(!show)}
            >
               {show ? "Hide" : "Show"}
            </Button>{" "}
         </Box>

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
         <Button onClick={(e) => submit(e)} disabled={disabled}>
            {" "}
            Submit{" "}
         </Button>
      </form>
   );
}
