import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";

const Dashboard: React.FC = () => {
  const [commits, setCommits] = useState<any[]>([]);

  const fetchingCommits = async () => {
    await axios
      .get("http://localhost:5000/")
      .then((response) => setCommits(response.data));
  };
  useEffect(() => {
    fetchingCommits();
  }, []);

  return commits ? (
    <Center bg="#191813" h="100vh" w="100vw">
      <Accordion
        bg="#ffffff"
        w="45%"
        h="75%"
        allowMultiple
        borderRadius="1%"
        p="10px"
      >
        <Heading mb="10px">Commits:</Heading>
        {commits.map((commit) => {
          return (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    display="flex"
                    alignItems="center"
                    textAlign="left"
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" textAlign="left">
                      <Avatar
                        name={commit.author.login}
                        src={commit.author.avatar_url}
                      />
                      <Text ml="10px" fontWeight="bold">
                        {commit.author.login}
                      </Text>
                    </Box>
                    <Text ml="10px" fontWeight="bold">
                      {moment(commit.author.date).format("h:mm:ss DD/MM/yyyy")}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{commit.commit.message}</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Center>
  ) : (
    <div>loading</div>
  );
};

export default Dashboard;
