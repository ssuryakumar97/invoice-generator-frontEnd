import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { BiSolidPencil, BiUpload } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateInvoiceWithProduct } from "../redux/invoicesSlice";
import { updateProduct } from "../redux/productSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const productList = useSelector((state) => state.products);
  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Products</h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
              {/* <h3 className="fw-bold pb-2 pb-md-4">Products</h3> */}
                <div className="fw-bold mt-1 mx-2 cursor-pointer">
                    <Link to="/">
                        <h5>Home</h5>
                    </Link>
                </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Price/Qty/Hr</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <InvoiceRow key={product.productId} product={product} />
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const InvoiceRow = ({ product }) => {
  const [edit, setEdit] = useState(false);
  const [productData, setProductData] = useState(product)
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEdit((prev) => !prev);
    if(edit){
        alert("Are you sure about product update??")
        dispatch(updateProduct(productData))
        dispatch(updateInvoiceWithProduct([productData]))
        // setEdit()
    }
  };

  const handleChange = (key, val) => {
    const obj = {[key]:val}
    setProductData((prev) => ({...prev, ...obj}))
  }
  return (
    <tr>
      <td className="fw-normal text-center">{product.productId}</td>
      <td className="fw-normal">{product.itemName}</td>
      <td className="fw-normal">
        {edit ? (
          <Form.Select
            className="my-1"
            name="itemType"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={productData.itemType}
          >
            <option value="product">Product</option>
            <option value="labour">Labour</option>
          </Form.Select>
        ) : (
          <>{product.itemType}</>
        )}
      </td>
      <td className="fw-normal">
        {edit ? (
          <Form.Control
            type="text"
            value={productData.itemDescription}
            name="itemDescription"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            style={{ maxWidth: "150px" }}
            placeholder={product.itemDescription}
            required
          />
        ) : (
          <>{product.itemDescription}</>
        )}
      </td>
      <td className="fw-normal">
        {edit ? (
          <Form.Control
            type="number"
            value={productData.itemPrice}
            name="itemPrice"
            onChange={(e) => handleChange(e.target.name, +e.target.value)}
            style={{ maxWidth: "150px" }}
            required
          />
        ) : (
          <>{product.itemPrice}</>
        )}
      </td>
      <td style={{ width: "5%" }}>
        {edit ? <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiUpload />
          </div>
        </Button> : <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button> }
        
      </td>
    </tr>
  );
};

export default Products;
