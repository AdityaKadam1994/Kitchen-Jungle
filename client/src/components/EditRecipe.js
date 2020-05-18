import React, { useState, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { RecipieAdd } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";

const EditRecipe = () => {
  const [title, setTitle] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [redirectionLink, setRedirectionLink] = useState(null);
  const { id } = useParams();
  const recData = useSelector((state) => state.recipieData);
  console.log(id);
  console.log(recData);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/api/items/${id}`).then((res) => {
      setTitle(res.data.title);
      setIngredients(res.data.ingredients);
      setImageLink(res.data.thumbnail);
      setRedirectionLink(res.data.redirection);
    });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let postRecipe = {
      title: title,
      ingredients: ingredients,
      redirection: redirectionLink,
      thumbnail: imageLink,
    };
    // dispatch(RecipieAdd(postRecipe));
    axios.put(`/api/items/${id}`, postRecipe).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Container>
        <h2 className="my-4">Edit Recipie Form</h2>
        <Form className="add-recipie-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Recipie Title</Label>
            <Input
              type="text"
              placeholder="Add recipie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Recipie Ingredients</Label>
            <Input
              type="text"
              placeholder="Add recipie ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Image Link</Label>
            <Input
              type="text"
              placeholder="Add Image Link"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Redirection Link To Recipie</Label>
            <Input
              type="text"
              placeholder="Add Redirection Link"
              value={redirectionLink}
              onChange={(e) => setRedirectionLink(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" className="btn-info">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditRecipe;
