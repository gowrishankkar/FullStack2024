export default function basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize, filters = {}) {
    if (products == null) {
        return;
    }

    /*************filtering -> hiding products*************/
    let filteredArr = products;

    // Search term filtering
    if (searchTerm != "") {
        filteredArr = filteredArr.filter((product) => {
            let lowerSearchTerm = searchTerm.toLowerCase();
            let lowerTitle = product.title.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        })
    }

    // Price range filtering
    if (filters.priceRange && filters.priceRange.length === 2) {
        const [minPrice, maxPrice] = filters.priceRange;
        filteredArr = filteredArr.filter((product) => {
            return product.price >= minPrice && product.price <= maxPrice;
        });
    }

    // Rating filtering
    if (filters.rating && filters.rating > 0) {
        filteredArr = filteredArr.filter((product) => {
            // Assuming rating is stored in product.rating, defaulting to 4.2 if not present
            const productRating = product.rating || 4.2;
            return productRating >= filters.rating;
        });
    }

    // Category filtering (enhanced from sidebar)
    if (filters.categories && filters.categories.length > 0) {
        filteredArr = filteredArr.filter((product) => {
            return filters.categories.some(category =>
                product.categories && product.categories.includes(category)
            );
        });
    } else if (currCategory != "All categories") {
        // Fallback to original category filtering if no sidebar categories selected
        filteredArr = filteredArr.filter((product) => {
            console.log(product.categories, currCategory)
            return product.categories.includes(currCategory);
        })
    }

    // Type filtering
    if (filters.types && filters.types.length > 0) {
        filteredArr = filteredArr.filter((product) => {
            return filters.types.includes(product.type);
        });
    }

    /***********************sorting -> rearrange**********************************/
    let filteredSortedArr = filteredArr;
    if (sortDir != 0) {
        // increasing
        if (sortDir == 1) {
            filteredSortedArr = filteredSortedArr.sort(incComparator);
        }
        //    decreasing order
        else {
            filteredSortedArr = filteredSortedArr.sort(decComparator);
        }
    }

    let filteredSortedgroupByArr = filteredSortedArr;

    let totalPages = Math.ceil(filteredSortedgroupByArr.length / pageSize);
    /************************Pagination *********************/
    let sidx = (pageNum - 1) * pageSize;
    let eidx = sidx + pageSize;
    filteredSortedgroupByArr =
        filteredSortedgroupByArr.slice(sidx, eidx);
    console.log(filteredSortedArr)

    return { filteredSortedgroupByArr, totalPages };
}


// total elem /elemperPage-> totalNumPages 








function incComparator(product1, product2) {
    if (product1.price > product2.price) {
        return 1
    } else {
        return -1;
    }
}
function decComparator(product1, product2) {
    if (product1.price < product2.price) {
        return 1
    } else {
        return -1;
    }
}