 import "modern-css-reset";
import "./../assets/styles/tailwind.css";
import "./../assets/styles/style.css";
import "phosphor-icons";

window.addEventListener("load", () =>{
    renderTodoItems();
    initModalWindowEvents();
    todoEvents();
});

const data = [
    {
        title: "hacer la compra",
        description: "leche, pan, agua",
        done: false
    }, {
        title:"estudiar js",
        description: "hacer ejercicios Youtube Carlos",
        done:false
    }
    , {
        title:"redacción",
        description: "redactar 2000 palabras",
        done:false
    }
]

const renderTodoItems = () => {
    const todoItmensBlock =document.querySelector(".todo_list")
    let todoItemsHTML = ""

    for (let index = 0; index < data.length; index++) {
        const dataItem = data[index];
        todoItemsHTML += `
            <article class="todo_list_item ${dataItem.done ? "hidden":""}">
                <div class="todo_list_description">
                  <h2 class="todo_list_title">
                    ${dataItem.title}
                  </h2>
                  <div class="todo_list_task_description">
                    ${dataItem.description}
                  </div>
                </div>
                <div class="ctas">
                  <div class="complete_buttons">              
                    <button class="mark_uncompleted">
                      <i class="ph-check-square"></i>
                    </button>

                    <button class="mark_completed hidden">
                      <i class="ph-check-square-fill"></i>
                    </button>

                  <button class="close_button">
                    <i class="ph-x-square-fill"></i>
                  </button>
                  </div>    
                </div>
            </article>
        `
    }
    todoItmensBlock.innerHTML = todoItemsHTML;
    todoEvents();
    renderMetaData();
}

const initModalWindowEvents = () =>{
    const newButton = document.querySelector(".new_button")
    const newButtonResponsive = document.querySelector(".new_button_icon")
    const modalWindow = document.querySelector(".modal_window")
    const modalWndowForm = modalWindow.querySelector("form")

    newButton.addEventListener("click", (ev) =>{
        console.log("click");
        modalWindow.classList.remove("invisible")
    });

    newButtonResponsive.addEventListener("click", (ev) =>{
        console.log("click");
        modalWindow.classList.remove("invisible")
    });

    modalWndowForm.addEventListener("reset", (ev) =>{
        ev.preventDefault();
        console.log("click")
        modalWindow.classList.add("invisible")

    });
    modalWndowForm.addEventListener("submit", (ev)=>{
        ev.preventDefault()
        modalWindow.classList.add("invisible")
        modalWndowForm.reset()
        const input = modalWndowForm.querySelector("input")
        data.push({
            title: input.value,
            done: false
        })
        renderTodoItems()

    });
};

const todoEvents = () =>{
    const todoItems =document.querySelectorAll(".todo_list_item")
    for (let index = 0; index < todoItems.length; index++) {
        const todoItem = todoItems[index];
        const closeButton = todoItem.querySelector(".close_button")
        const markCompleted = todoItem.querySelector(".mark_completed")
        const markUncompleted = todoItem.querySelector(".mark_uncompleted")
        
        closeButton.addEventListener("click", (ev) =>{
            data.splice(index, 1)
            renderTodoItems()
            console.log("click");
        })

        markCompleted.addEventListener("click", (ev) =>{
            data[index].done= false
            //no consigo hacer que cambie el botón de un estado a otro
            markUncompleted.classList.remove("hidden");
            markCompleted.classList.add("hidden");
            
            console.log("click");
            renderTodoItems()
           
            //todoItem.classList.remove("done")
        });
        markUncompleted.addEventListener("click", (ev) =>{
            data[index].done= true
            //no consigo hacer que cambie el botón de un estado a otro
            markUncompleted.classList.add("hidden");
            markCompleted.classList.remove("hidden");
            console.log("click");
            renderTodoItems()
            
            
            //todoItem.classList.add("done")
        });
    }
}


//Barra de progreso

const renderMetaData = () =>{
    const amountDone = document.querySelector(".amount_done")
    const amountTotal = document.querySelector(".amount_total")
    const progressBar = document.querySelector(".progress_bar_completed")
    
    let counter = 0
    for (let index = 0; index < data.length; index++) {
       if (data[index].done) counter++;
        
    }
    
    amountTotal.innerHTML = data.length
    amountDone.innerHTML = counter
    progressBar.style.width = `${(counter / data.length) * 100}%`
    
}


