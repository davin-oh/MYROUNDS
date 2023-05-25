const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
scoreTag = popupBox.querySelector('input[name="userScore"]'),
descTag = popupBox.querySelector("textarea"),
boxes = document.querySelector(".wrapper");
addBtn = popupBox.querySelector("button");
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;


addBox.addEventListener("click", () => {
    popupTitle.innerText = "How was today's round?";
    addBtn.innerText = "Submit";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
    if(window.innerWidth > 660) scoreTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = scoreTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
/*function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <p1>${note.score}</p1>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}*/
function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        const max_body_length = 85;
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <p1>${note.score}</p1>
                            <span>
                            ${filterDesc.substring(0, max_body_length)}
                            ${filterDesc.length > max_body_length ? "..." : ""}
                            </span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${note.score}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });

    /*boxes.addEventListener("click", () => {
        popupTitle.innerText = "How was today's round?";
        addBtn.innerText = "Submit";
        popupBox.classList.add("show");
        document.querySelector("body").style.overflow = "hidden";
        if(window.innerWidth > 660) titleTag.focus();
        if(window.innerWidth > 660) scoreTag.focus();
    })*/
    /*notes.forEach((note, id) => {
            let filterDesc = note.description.replaceAll("\n", '<br/>');
            let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <p1>${note.score}</p1>
                                <span>${filterDesc}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                        <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
            addBox.insertAdjacentHTML("afterend", liTag);
        });

    }*/

}
showNotes();
expandNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

/*boxes.addEventListener("click", () => {
    popupTitle.innerText = "How was today's round?";
    addBtn.innerText = "Submit";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
    if(window.innerWidth > 660) scoreTag.focus();
})*/

function updateNote(noteId, title, score, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    //scoreTag = popupBox.querySelector('input[name="userScore"]'),
    scoreTag.value = score;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}



addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    score = scoreTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, score, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});