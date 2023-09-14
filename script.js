"use strict";

//lytter på om DOM er indlæst og kører herefter scriptet
document.addEventListener("DOMContentLoaded", () => {
  // variabler for input, knap og todo og done

  const input = document.getElementById("input");
  const inputBtn = document.getElementById("input_btn");
  const quantity = document.getElementById("input_quantity");
  const toDo = document.getElementById("to_do");
  const done = document.getElementById("done");

  // henter tasks fra localStorage og konverterer dem fra strings
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  console.log("tasks", tasks);

  // gemmer tasks i localStorage og konverterer dem til strings
  // disse gemmes som variabler
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // add tasks funktionen opretter tasks og indsætter dem via innerHTML
  function addTasks() {
    toDo.innerHTML = "<h2>To do</h2>";
    done.innerHTML = "<h2>Done</h2>";

    // denne forEach kører gennem arrayet af tasks og tilføjer dem til HTML
    // via div, som oprettes via createElement
    //taskElement, som ligger i den oprettede div indeholder beskrivelsen
    // samt en delete option og en undo option
    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.dataset.id = crypto.randomUUID();
      taskElement.classList.add("task");
      taskElement.innerHTML = `
                <div>
                <span>${task.description}</span>
                <span>${task.theQuantity}</span>
                </div>
                <div>
                <button data-index="${index}" class="delete">Delete</button>
                <button data-index="${index}" class="toggle">${task.done ? "Undo" : "Done"}</button>
                </div>
                `;
      // hvis delete klikkes på fjernes (start)index (deletecount)1  via splice
      // efterfølgende kaldes saveTasks og addTasks
      taskElement.querySelector(".delete").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        addTasks();
      });

      // via QSL findes element med classen toggle og tilføjer en evtlistener
      //efterfølgende ændrer den status for den akutelle opgave
      // hvis opgaven er done bliver den 'not done'
      //og hvis opgaven er 'not done' bliver den done
      taskElement.querySelector(".toggle").addEventListener("click", () => {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        addTasks();
      });

      // hvis task er done tilføjes der et child element til done (parent)
      // ellers tilføjes der et child element til to do (parent)
      if (task.done) {
        done.appendChild(taskElement);
      } else {
        toDo.appendChild(taskElement);
      }
    });
  }

  // lytter efter click på inputBtn
  inputBtn.addEventListener("click", () => {
    // ny const, som er værdien af input (altså det som indtastes)
    const description = input.value;
    const theQuantity = quantity.value;

    // trim fjerner mellemrum før eller efter inputtet
    //og hvis der efter trim ikke er noget indhold udføres return ikke
    // så der ikke kan tilføjes en tom task
    if (description.trim() === "") return;

    // denne opretter en ny task som et object
    //er en slags tom model for objectet
    const newTask = {
      description,
      theQuantity,
      done: false,
    };

    // via push insættes det nye object newTask til arrayet af tasks
    tasks.push(newTask);
    // sender objectet til localStorage
    saveTasks();
    // nustiller input value
    input.value = "";
    //tilføjer den nye task til toDo
    addTasks();
  });

  // kalder addTasks funktionen
  addTasks();
});
