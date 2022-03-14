import { Pagination } from "antd";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Products from "./Products";
const PER_PAGE = 10;
const Home = () => {
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getData();
  }, [page]);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await Axios.get(
        `https://ct9arfm4zl.execute-api.us-east-1.amazonaws.com/api/v1/distributors_wanted?page=${page}&per_page=${PER_PAGE}`
      );

      setProduct(data?.data);
      setTotal(data?.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query !== "") {
      const filterData = product.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      setProduct(filterData);
    } else {
      getData();
    }
  }, [query]);
  const handleNext = async (page) => {
    setPage(page);
  };
  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg  navbar-light bg-light">
          App
        </nav>
      </div>
      <div className="mb-5 mt-4 d-flex justify-content-center">
        <Pagination
          total={total}
          current={page}
          pageSize={PER_PAGE}
          onChange={handleNext}
          showSizeChanger={false}
        />
      </div>
      <Products product={product} query={query} loading={loading} />
      <div className="mb-5 mt-3 d-flex justify-content-center">
        <Pagination
          total={total}
          current={page}
          pageSize={PER_PAGE}
          onChange={handleNext}
          showSizeChanger={false}
        />
      </div>
      <br />
    </>
  );
};

export default Home;
