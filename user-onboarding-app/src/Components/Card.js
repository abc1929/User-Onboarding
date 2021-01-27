import React from "react";
import { Stack, Box, Text } from "@chakra-ui/react";

export default function Card(props) {
   const { name } = props.userdata;

   return (
      <Stack>
         <Box
            // border="1px gray"
            padding="2%"
            width="50%"
            margin="1% 0%"
            borderRadius="8px"
            bgColor="#f2f7f7"
         >
            <Text> {name} </Text>
         </Box>
      </Stack>
   );
}
