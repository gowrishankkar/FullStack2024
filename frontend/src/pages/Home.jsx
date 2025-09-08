import { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import basicOps from "../utility/basicOps";
import { usePaginationContext } from "../contexts/PaginationContext";
import axios from "axios";
import URL from "../urlConfig";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Pagination, Stack } from "@mui/material";
import { InputBase, Paper, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        style={{ alignItems: "center", marginTop: "10px" }}
      >
        <Grid item container alignItems="center" spacing={2} xs={3} md="auto">
          <Grid item>
            <Paper
              component="form"
              sx={{
                p: "2px 8px",
                display: "flex",
                alignItems: "center",
                width: 250,
                borderRadius: "999px",
                backgroundColor: "#fafcfdff",
                boxShadow: "none",
                border: "0.5px solid #acaaaaff",
              }}
            >
              <SearchIcon sx={{ color: "#888", mr: 1 }} />
              <InputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  flex: 1,
                  fontSize: "0.9rem",
                }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageNum(1);
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <ArrowCircleUpIcon
              style={{ color: "blue" }}
              fontSize="large"
              onClick={() => {
                setsortDir(1);
                setPageNum(1);
              }}
            ></ArrowCircleUpIcon>
            <ArrowCircleDownIcon
              fontSize="large"
              style={{ color: "blue" }}
              onClick={() => {
                setsortDir(-1);
                setPageNum(1);
              }}
            ></ArrowCircleDownIcon>
          </Grid>
        </Grid>
        <Grid item xs={9} md="auto">
          <Categories
            categories={categories}
            setCurrCategory={setCurrCategory}
            currCategory={currCategory}
          ></Categories>
        </Grid>
      </Grid>

      {/* main area  */}
      <main className="product_wrapper">
        {/* products will be there */}
        <ProductList
          productList={filteredSortedgroupByArr}
          currCategory={currCategory}
        >
           ̰
        </ProductList>
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
