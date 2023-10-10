import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../reducers/app";
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import useScrollPosition from "../hooks/useScrollPosition";
import dotsBounce from "../assets/3-dots-bounce.svg";

const List = () => {
  const perPage = 30;
  const [page, setPage] = useState(1);
  const { list, isLoading, total } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    dispatch(fetchData({ page, perPage }));
    setPage((previousValue) => previousValue + 1);
  }, []);

  useEffect(() => {
    if (scrollPosition > 95 && !isLoading && list.length < total) {
      dispatch(fetchData({ page, perPage }));
      setPage((previousValue) => previousValue + 1);
    }
  }, [scrollPosition]);

  return (
    <div style={{ minHeight: "90vh", width: "100%" }}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {list.length > 0
          ? list.map((item) => (
              <GridItem
                key={item.id}
                w="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={item.urls.thumb} />
                <Text>{item.user.name}</Text>
              </GridItem>
            ))
          : null}
      </Grid>
      <Flex alignItems="center" justifyContent="center" py={10}>
        {isLoading && <img src={dotsBounce} alt="Loading Spinner" />}
      </Flex>
      {list.length >= total && <Text textAlign="center">There is nothing more to load</Text>}
    </div>
  );
};

export default List;
