import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
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
import { RecipeGetDispatcher, deleteRecipeDispatcher } from "../store/actions";

const RecipieList = () => {
  const [recipieList, setRecipieList] = useState([]);
  const dispatch = useDispatch();
  const recData = useSelector((state) => state.recipieData);
  const [perPage, setPerpage] = useState(3);
  const [current, setCurrent] = useState(1);
  // setTotal(recData.length);

  useEffect(() => {
    dispatch(RecipeGetDispatcher());
  }, []);

  const handleDelete = (Id) => {
    dispatch(deleteRecipeDispatcher(Id));
  };

  //pagination
  const lastRecipeIndex = current * perPage;
  const firstRecipeIndex = lastRecipeIndex - perPage;
  const currentRecData = recData.slice(firstRecipeIndex, lastRecipeIndex);
  const paginate = useCallback((pageNumber) => {
    setCurrent(pageNumber);
  });

  return (
    <div className="class-list-wrapper">
      <Container>
        <Row className="my-5">
          {currentRecData
            ? currentRecData.map((item) => (
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
        <Pagination
          totalRecipe={recData.length}
          recipePerPage={perPage}
          paginate={paginate}
        />
      </Container>
    </div>
  );
};

export default RecipieList;
