import React from "react";
import { useContext } from "react";
import CategoryContext from "../context/CategoryContext";

export default function CategoryPage(){

    let {categories} = useContext(CategoryContext)
    let {editCategories} = useContext(CategoryContext)
    let {addCategories} = useContext(CategoryContext)
    let {deleteCategory} = useContext(CategoryContext)

    let handleEdit=(id)=>{
        document.getElementById("category"+id).style.display="none"
        document.getElementById("submit"+id).style.display="block"
        let inputfield  = document.getElementById("catinput"+id) 
        inputfield.style.display="block"
        inputfield.style.color="orange"

    }

    let handleEditSubmit=(id)=>{
        document.getElementById("category"+id).style.display="block"
        document.getElementById("submit"+id).style.display="none"
        document.getElementById("delete"+id).style.display="none"
        document.getElementById("catinput"+id).style.display="none"
        let value = document.getElementById("catinput"+id).value
        editCategories(id,value)
        
    }

    let handleAdd=()=>{
        document.getElementById("categorynew").style.display="none"
        document.getElementById("addnewcat").style.display="block"
        let inputfield  = document.getElementById("cataddinput") 
        inputfield.style.display="block"
        inputfield.style.color="orange"
    }

    let handleAddSubmit=()=>{
        document.getElementById("categorynew").style.display="block"
        document.getElementById("addnewcat").style.display="none"
        document.getElementById("cataddinput").style.display="none"
        let value = document.getElementById("cataddinput").value
        addCategories(value)
    }
    let handleDelete=(id,name)=>{
        document.getElementById("delete"+id).style.display="block"
    }

    let handleDeleteSubmit=(id)=>{
        document.getElementById("category"+id).style.display="block"
        document.getElementById("submit"+id).style.display="none"
        document.getElementById("delete"+id).style.display="none"
        document.getElementById("catinput"+id).style.display="none"
        deleteCategory(id)   
    }

    return(
        <div className="container card" style={{marginTop:"20px"}}>
        <div style={{"padding":"27px"}}>
            <h2 >Categories</h2>
            <pre>Double click to delete,  Click to edit</pre>
        </div>
        <ul className="row">
            {categories? categories.map(category=>(
                <>
                  <li id={"category"+category.id} onClick={()=>handleEdit(category.id)} className="card category">{category.categoryname}</li> 
                    <input onDoubleClick={()=>handleDelete(category.id,category.categoryname)} onChange={()=>handleEdit(category.id)} id={"catinput"+category.id} className="categoryinput card category" type="text" name='category' required defaultValue={category.categoryname} />
                    <input id={"submit"+category.id} onClick={()=>handleEditSubmit(category.id)} style={{display:"none"}} className="card addnewcategory"  type="submit" value="save"/>
                    <input id={"delete"+category.id} onClick={()=>handleDeleteSubmit(category.id)} style={{display:"none","margin-color":"red"}} className="card deletecategory"  type="submit" value="delete"/>
                </>          
            )):""}
            <li onClick={()=>handleAdd()} id="categorynew" className="card addnewcategory">Add New Category</li>
            <input  id="cataddinput" className="categoryinput card category" type="text" name='category' required/>
            <input onClick={()=>handleAddSubmit()} id="addnewcat"  style={{display:"none"}} className="card addnewcategory"  type="submit" value="save"/>
        </ul>
        <br/>
        </div>
    );

}