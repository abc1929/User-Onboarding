import React, { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Form from "./Components/Form";
import Card from "./Components/Card";

const initialform = {
   name: "",
   email: "",
   password: "",
   role: "",
   agreed: false,
};

const initialerrors = {
   name: "",
   email: "",
   password: "",
   role: "",
   agreed: false,
};

function App() {
   const [formvalues, setFormvalues] = useState(initialform);
   const [users, setUsers] = useState([]);
   const [errors, setErrors] = useState(initialerrors);

   return (
      <ChakraProvider>
         <div className="content">
            <Form
               formvalues={formvalues}
               setFormvalues={setFormvalues}
               users={users}
               setUsers={setUsers}
               initialform={initialform}
               errors={errors}
               setErrors={setErrors}
            />
            <div className="userlist">
               <p> User List: </p>
               {users.map((i) => {
                  return <Card key={i.name} userdata={i} />;
               })}
            </div>
         </div>
      </ChakraProvider>
   );
}

export default App;
