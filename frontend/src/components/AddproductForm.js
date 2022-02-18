import React from "react";
import { rooturl } from "../utils/functions";
import { useContext } from "react";
import CategoryContext from "../context/CategoryContext";
import { useState } from "react";
import { useEffect } from "react";

export default function ProductForm(props){


  let {categories} = useContext(CategoryContext)

  let handleImageChange=(e)=>{
    let image = e.target.files[0]
    document.getElementById("ProductFormImage").src = URL.createObjectURL(image)
  }

  return(
      <form onSubmit={props.onSubmit} id={props.id} style={props.style}>
        <p>
          <p>Name :</p>
          <input type="text" name='name' className="productformfield" required defaultValue={props.name} />
        </p>
        <p>
          <p>Image :</p>
          <img src={rooturl+props.image} id="ProductFormImage" className="productformfield" style={{maxHeight:"300px",marginBottom:"3px",width:"auto"}}></img>
          <input 
                type="file"
                id="ProductImageSubmit"
                name="image"
                accept="image/png image/jpg image/jpeg" 
                onChange={handleImageChange}
                className="productformfield" 
                defaultValue={props.image}/>
        </p>
        <p>
          <p>Description :</p>
          <textarea type="text" name='description' className="productdescriptionfield"  required defaultValue={props.description}  />
        </p>
        <p>
          <p>Price :</p>
          <input type="text" name='price' className="productformfield" required defaultValue={props.price} />
        </p>
        <p>
          <p>Category :</p>
          <select name="category" required className="productformcategoryfield" multiple>
          {categories? categories.map(category=>(
            <Option selected="" id={category.id} name={category.categoryname}/>
          )):""}
          </select>
        </p>
        <input className="btn btn-sm btn-outline-success" value="save" type="submit"/>
      </form>
  )

}


function Option(props){
  return(
      <option
      id={props.id}
      value={props.id}
      selected={props.selected}>
      {props.name}
      </option>

  )
}
