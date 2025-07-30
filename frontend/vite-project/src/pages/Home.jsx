import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import basicOps from "../utility/basicOps";
import { usePaginationContext } from "../contexts/PaginationContext";
import axios from "axios";
import URL from "../urlConfig";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Pagination, Stack } from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setsortDir] = useState(0);
  const [currCategory, setCurrCategory] = useState("All categories");
  const { pageSize, pageNum, setPageNum, setPageSize } = usePaginationContext();

  const onPageChange = useEffect(() => {
    (async function () {
      // const resp = await fetch(`https://fakestoreapi.com/products`)
      const productData = await axios.get(URL.GET_PRODUCTS);
      const productArr = productData.data.data;
      const productList = productArr.map((product) => {
        return {
          id: product._id,
          title: product.name,
          image: product.images[0],
          price: product.price,
          ...product,
        };
      });
      console.log(productList);

      // const productData = await resp.json();
      setProducts(productList);
    })();
  }, []);

  /**************getting all the categroies ********************/
  useEffect(() => {
    (async function () {
      // const resp = await fetch(`https://fakestoreapi.com/products/categories`)
      const categories = await axios.get(URL.GET_CATEGORIES);
      console.log(categories);
      setCategories(categories.data.data);
    })();
  }, []);
  const object = basicOps(
    products,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize
  );
  const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
  const totalPages = object.totalPages;
  return (
    <>
      {/* header */}
      <header className="nav_wrapper">
        <div className="search_sortWrapper">
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageNum(1);
            }}
            sx={{ maxWidth: 500, backgroundColor: "white", borderRadius: 1 }}
          />
          <div className="icons_container">
            <ArrowCircleUpIcon
              style={{ color: "white" }}
              fontSize="large"
              onClick={() => {
                setsortDir(1);
                setPageNum(1);
              }}
            ></ArrowCircleUpIcon>
            <ArrowCircleDownIcon
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => {
                setsortDir(-1);
                setPageNum(1);
              }}
            ></ArrowCircleDownIcon>
          </div>
        </div>

        <div className="categories_wrapper">
          <Categories
            categories={categories}
            setCurrCategory={setCurrCategory}
          ></Categories>
        </div>
      </header>

      {/* main area  */}
      <main className="product_wrapper">
        {/* products will be there */}
        <ProductList productList={filteredSortedgroupByArr}> ̰</ProductList>
      </main>
      {/* pagination */}
      <div className="pagination">
        <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={pageNum}
            onChange={(event, value) => setPageNum(value)}
            color="primary"
            size="large"
          />
        </Stack>
      </div>
    </>
  );
}

export default Home;
