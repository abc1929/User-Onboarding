import React from "react";
import { Stack, Box, Text, Tooltip } from "@chakra-ui/react";

export default function Card(props) {
   const { name, email } = props.userdata;

   return (
      <Stack>
         <Tooltip label={email} aria-label="A tooltip">
            <Box
               className="usercard"
               // border="1px gray"
               padding="2%"
               width="50%"
               margin="1% 0%"
               borderRadius="8px"
               bgColor="#f2f7f7"
            >
               <Text> {name} </Text>
            </Box>
         </Tooltip>
      </Stack>
   );
}
