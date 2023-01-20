import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";


// const toDoList = [
//     {   
//         data: text,
//         date: new Date(),
//         isCompleted: Boolean

//     },
// ]

const setDataToLocalStorage = ({newToDoList}) =>{
    return localStorage.setItem("todos", JSON.stringify(newToDoList));
}

const getDataFromLocalStorage = () => {
    return JSON.parse((localStorage.getItem("todos")));
}

const App = () =>{
    const intialData = getDataFromLocalStorage();
    const [text, setText] = useState("");
    const [toDoList, setToDoList] = useState([...intialData]);

    //TEXT change
    const handleChange = (e) =>{
        setText(e.target.value);
    }

    //Adding todo
    const addToDo = () => {
        

        if(text === ""){
            alert("Please filled up!")
        }else{
            
            const newToDoList = (
                [
                    ...toDoList, 
                    { 
                        data: text, 
                        date: new Date().toLocaleString().split(",")[0], 
                        isCompleted: false
                    }
                ]
            );

            
            setToDoList(newToDoList);
            setDataToLocalStorage({newToDoList})
        }

        setText("");


    }

    //ToggleToDo
    const toggleToDo = (idx) => {

        const newToDoList = toDoList.map((toDo, index) =>
            index === idx ? {...toDo, isCompleted: !toDo.isCompleted} : {...toDo}
        )

        setToDoList(newToDoList);
        setDataToLocalStorage({newToDoList})

    }

    //DeleteToDo
    const deleteToDo = (idx) => {

        const response = window.confirm("Are you sure Want to Delete it ?");
        if(response){
            const newToDoList = toDoList.filter((toDo, index)=>
                index === idx ? false : true
            )
            setToDoList(newToDoList);
            setDataToLocalStorage({newToDoList})
        }

    }

    return (
        <div>
            <div>
                <h1>
                    ToDo List
                </h1>
            </div>
            <TextField 
                value={text}
                onChange={handleChange}
                onKeyPress={(e) => e.key === "Enter" && addToDo()}
            />
            <Button  
                variant="contained"
                onClick={addToDo}

            >
                Add
            </Button>


            <div>
                {toDoList.map((toDo, index) =>{
                    return (
                        <div key={index} style={{display: "flex"}}>
                            <div 
                                style={{border: "1px solid black", width: "30%", background: toDo.isCompleted ? "red": "green", textDecoration: toDo.isCompleted && "line-through"}}
                                onClick={() => toggleToDo(index)}
                            >
                                <li 
                                     
                                    style={{listStyle: "none"}}
                                >
                                    {toDo.data}
                                    <br />
                                    {toDo.date}
                                </li>
                                
                            </div>
                            <div>
                                <Button
                                    variant="outlined"
                                    onClick={() => deleteToDo(index)}
                                    

                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export {App};