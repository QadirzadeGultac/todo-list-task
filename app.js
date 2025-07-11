const selected = document.querySelector('.selected');
const options = document.querySelector('.options');
const openIcon = document.querySelector('.selected .open');
const closeIcon = document.querySelector('.selected .close');

selected.addEventListener('click', () => {
  options.classList.toggle('open');
  openIcon.classList.toggle('disnone');
  closeIcon.classList.toggle('disnone');
});

document.querySelectorAll('.options li').forEach(option => {
  option.addEventListener('click', () => {
    selected.childNodes[0].textContent = option.textContent;
    options.classList.remove('open');
    openIcon.classList.remove('disnone');
    closeIcon.classList.add('disnone');

    // Filtrlə
    filterTodos(option.textContent);
  });
});

document.addEventListener('click', function(e) {
  if (!document.querySelector('.custom-select').contains(e.target)) {
    options.classList.remove('open');
    openIcon.classList.remove('disnone');
    closeIcon.classList.add('disnone');
  }
});

// ------------------------
// Modal açılıb bağlanması
// ------------------------

const openModalBtn = document.getElementById("openModalBtn");
const modalLight = document.querySelector(".modal-light");
const modalDark = document.querySelector(".modal-dark");

openModalBtn.addEventListener("click", () => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    modalDark.classList.remove("disnone");
  } else {
    modalLight.classList.remove("disnone");
  }
});

const closeModalBtnLight = document.querySelector(".modal-light-close-button");
closeModalBtnLight.addEventListener("click", () => {
  modalLight.classList.add("disnone");
});

const closeModalBtnDark = document.querySelector(".modal-dark-close-button");
closeModalBtnDark.addEventListener("click", () => {
  modalDark.classList.add("disnone");
});

// ------------------------
// Search input focus-gizlətmə
// ------------------------

const searchBarLight = document.querySelector('.search-bar-light');
const inputLight = searchBarLight.querySelector('.input-light');
const notePLight = searchBarLight.querySelector('.note-p-light');

const searchBarDark = document.querySelector('.search-bar-dark');
const inputDark = searchBarDark.querySelector('.input-dark');
const notePDark = searchBarDark.querySelector('.note-p-dark');

inputLight.addEventListener('focus', () => {
  notePLight.classList.remove('disnone');
});

inputDark.addEventListener('focus', () => {
  notePDark.classList.remove('disnone');
});

document.addEventListener('click', (event) => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    if (!searchBarDark.contains(event.target)) {
      notePDark.classList.add('disnone');
    }
  } else {
    if (!searchBarLight.contains(event.target)) {
      notePLight.classList.add('disnone');
    }
  }
});

// ------------------------
// Dark-Light mode switch
// ------------------------

const darkLight = document.querySelector('.light-dark');
const darkmode = document.querySelector('.darkMode');
const lightmode = document.querySelector('.lightMode');
const darkEmpty = document.querySelector('.dark-empty');
const lightEmpty = document.querySelector('.light-empty');

darkmode.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  searchBarLight.classList.add('disnone');
  searchBarDark.classList.remove('disnone');
  darkmode.classList.add('disnone');
  lightmode.classList.remove('disnone');

  checkEmptyState(); // Rejim dəyişəndə yoxlama
});

lightmode.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  searchBarLight.classList.remove('disnone');
  searchBarDark.classList.add('disnone');
  darkmode.classList.remove('disnone');
  lightmode.classList.add('disnone');

  checkEmptyState(); // Rejim dəyişəndə yoxlama
});

// ------------------------
// Yeni qeydi əlavə et (Apply düyməsi)
// ------------------------

const applyBtnLight = document.querySelector(".modal-light-apply-button");
const applyBtnDark = document.querySelector(".modal-dark-apply-button");
const todoList = document.querySelector(".todo-list");

applyBtnLight.addEventListener("click", () => {
  const input = document.querySelector(".modal-light-content input");
  const noteText = input.value.trim();

  if (noteText !== "") {
    addNewTodoItem(noteText);
    input.value = "";
    modalLight.classList.add("disnone");
    checkEmptyState();
  } else {
    alert("Note boş ola bilməz!");
  }
});

applyBtnDark.addEventListener("click", () => {
  const input = document.querySelector(".modal-dark-content input");
  const noteText = input.value.trim();

  if (noteText !== "") {
    addNewTodoItem(noteText);
    input.value = "";
    modalDark.classList.add("disnone");
    checkEmptyState();
  } else {
    alert("Note boş ola bilməz!");
  }
});

// ------------------------
// Empty state yoxlama funksiyası
// ------------------------

function checkEmptyState() {
  const remainingTodos = todoList.querySelectorAll(".todo-item").length;
  const isDarkMode = document.body.classList.contains("dark-mode");

  if (remainingTodos === 0) {
    if (isDarkMode) {
      darkEmpty.classList.remove("disnone");
      lightEmpty.classList.add("disnone");
    } else {
      lightEmpty.classList.remove("disnone");
      darkEmpty.classList.add("disnone");
    }
  } else {
    lightEmpty.classList.add("disnone");
    darkEmpty.classList.add("disnone");
  }
}

// ------------------------
// Yeni item yaratmaq funksiyası
// ------------------------

function addNewTodoItem(noteText) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const noteSpan = document.createElement("span");
  noteSpan.textContent = noteText;

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("icons-container");

  const editIcon = document.createElement("img");
  editIcon.src = "assets/editGray.svg";
  editIcon.alt = "edit";
  editIcon.classList.add("icon", "edit-icon");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "assets/deleteGray.svg";
  deleteIcon.alt = "delete";
  deleteIcon.classList.add("icon", "delete-icon");

  // Hover effektləri
  editIcon.addEventListener("mouseenter", () => {
    editIcon.src = "assets/editPurple.svg";
  });
  editIcon.addEventListener("mouseleave", () => {
    editIcon.src = "assets/editGray.svg";
  });

  deleteIcon.addEventListener("mouseenter", () => {
    deleteIcon.src = "assets/deleteRed.svg";
  });
  deleteIcon.addEventListener("mouseleave", () => {
    deleteIcon.src = "assets/deleteGray.svg";
  });

  // Sil düyməsi
  deleteIcon.addEventListener("click", () => {
    todoItem.remove();
    checkEmptyState();
  });

  // Edit düyməsi
  editIcon.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = noteSpan.textContent;
    editInput.classList.add("edit-input");

    todoItem.replaceChild(editInput, noteSpan);
    editInput.focus();

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        noteSpan.textContent = editInput.value.trim() || "Untitled";
        todoItem.replaceChild(noteSpan, editInput);
      }
    });

    editInput.addEventListener("blur", () => {
      noteSpan.textContent = editInput.value.trim() || "Untitled";
      todoItem.replaceChild(noteSpan, editInput);
    });
  });

  iconsContainer.appendChild(editIcon);
  iconsContainer.appendChild(deleteIcon);

  todoItem.appendChild(checkbox);
  todoItem.appendChild(noteSpan);
  todoItem.appendChild(iconsContainer);

  todoList.appendChild(todoItem);

  const activeFilter = selected.childNodes[0].textContent;
  filterTodos(activeFilter);

  checkEmptyState(); // Yeni item əlavə olunanda yoxla
}

// ------------------------
// Checkbox xətt funksiyası
// ------------------------

todoList.addEventListener("change", function(e) {
  if (e.target.type === "checkbox") {
    const span = e.target.nextElementSibling;
    if (e.target.checked) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.5";
    } else {
      span.style.textDecoration = "none";
      span.style.opacity = "1";
    }
    const activeFilter = selected.childNodes[0].textContent;
    filterTodos(activeFilter);
  }
});

// ------------------------
// Axtarış funksiyaları
// ------------------------

const searchIconLight = document.getElementById("searchIconLight") || document.querySelector('.search-bar-light img');
const searchIconDark = document.querySelector('.search-bar-dark img');

function searchTodos(query) {
  const todos = todoList.querySelectorAll('.todo-item');
  todos.forEach(todo => {
    const noteText = todo.querySelector('span').textContent.toLowerCase();
    if (noteText.includes(query.toLowerCase())) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
}

searchIconLight.addEventListener('click', () => {
  const query = inputLight.value.trim();
  searchTodos(query);
});

searchIconDark.addEventListener('click', () => {
  const query = inputDark.value.trim();
  searchTodos(query);
});

// ------------------------
// Filter funksiyası
// ------------------------

function filterTodos(filter) {
  const todos = todoList.querySelectorAll('.todo-item');
  todos.forEach(todo => {
    const checkbox = todo.querySelector('input[type="checkbox"]');
    switch(filter) {
      case 'All':
        todo.style.display = "flex";
        break;
      case 'Complete':
        todo.style.display = checkbox.checked ? "flex" : "none";
        break;
      case 'Incomplete':
        todo.style.display = !checkbox.checked ? "flex" : "none";
        break;
    }
  });
}
