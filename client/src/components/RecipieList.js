import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { RecipieGet, DeleteRecipie } from "../store/actions";

const RecipieList = () => {
  const [recipieList, setRecipieList] = useState([]);
  const dispatch = useDispatch();

  const recData = useSelector((state) => state.recipieData);
  console.log(recData);

  useEffect(() => {
    setRecipieList(recData);
    axios.get("/api/items").then((res) => {
      dispatch(RecipieGet(res.data));
    });
  }, []);

  const handleDelete = (Id) => {
    dispatch(DeleteRecipie(null, Id));
    axios.delete(`/api/items/${Id}`).then((res) => console.log(res));
  };

  return (
    <div className="class-list-wrapper">
      <Container>
        <Row className="my-5">
          {recData
            ? recData.map((item) => (
                <Col key={item._id} md="4" className="mb-4">
                  <Card className="h-100">
                    <CardImg
                      top
                      width="100%"
                      src={`${item.thumbnail}`}
                      alt={item.title}
                    />
                    <span
                      className="delete-recipie"
                      onClick={() => handleDelete(item._id)}
                    >
                      &times;
                    </span>
                    <CardBody>
                      <CardTitle>
                        {" "}
                        <h3 className="mb-3">
                          <a
                            href={item.redirection}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </a>
                        </h3>
                      </CardTitle>
                      <CardSubtitle>
                        <p className="ingredients">
                          Ingredients: {item.ingredients}
                        </p>
                        <Link to={"edit_recipe/" + item._id}>Edit</Link>
                      </CardSubtitle>
                    </CardBody>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </div>
  );
};

export default RecipieList;
