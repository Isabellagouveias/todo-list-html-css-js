const nameInput = document.getElementById("nomeInput");
const descInput = document.getElementById("descInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTask(task, false));
};

function addTask(task = null, save = true) {
  const name = task?.nome || nameInput.value.trim();
  const description = task?.descricao || descInput.value.trim();
  const completed = task?.concluida || false;

  // Verificar se o nome foi preenchido e a descrição é opcional
  if (name === "") {
    showModal("O nome da tarefa é obrigatório!");
    return;
  }

  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
      <div class="task-text">
        <div class="task-name">${name}</div>
        <div class="task-desc">${description || "Sem descrição"}</div>
      </div>
      <div class="btns">
        <button class="btn-complete">${
          completed ? "Desfazer" : "Concluir"
        }</button>
        <button class="btn-delete">Excluir</button>
      </div>
    `;

  li.querySelector(".btn-complete").addEventListener("click", () => {
    li.classList.toggle("completed");
    const isDone = li.classList.contains("completed");
    li.querySelector(".btn-complete").textContent = isDone
      ? "Desfazer"
      : "Concluir";
    updateLocalStorage();
  });

  li.querySelector(".btn-delete").addEventListener("click", () => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );
    if (confirmDelete) {
      li.remove();
      updateLocalStorage();
    }
  });

  taskList.appendChild(li);

  // Limpar os campos de input após adicionar a tarefa
  if (!task) {
    nameInput.value = "";
    descInput.value = "";
  }

  // Salvar no localStorage
  if (save) updateLocalStorage();
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map((li) => ({
    nome: li.querySelector(".task-name").textContent,
    descricao: li.querySelector(".task-desc").textContent,
    concluida: li.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
