const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
scoreTag = popupBox.querySelector('input[name="userScore"]'),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const rounds = JSON.parse(localStorage.getItem("rounds") || "[]");
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

function showRounds() {
    if(!rounds) return;
    document.querySelectorAll(".round").forEach(li => li.remove());
    rounds.forEach((round, id) => {
        const max_body_length = 45;
        let filterDesc = round.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="round">
                                <div class="details">
                                    <p onclick="updateround(${id}, '${round.title}', '${round.score}', '${filterDesc}')">${round.title}</p>
                                    <p1 onclick="updateround(${id}, '${round.title}', '${round.score}', '${filterDesc}')">${round.score}</p1>
                                    <span onclick="updateround(${id}, '${round.title}', '${round.score}', '${filterDesc}')">
                                    ${filterDesc.substring(0, max_body_length)}
                                    ${filterDesc.length > max_body_length ? "..." : ""}
                                    </span>
                                </div>
                                <div class="bottom-content">
                                    <span>${round.date}</span>
                                    <div class="settings">
                                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                        <ul class="menu">
                                            <li onclick="deleteround(${id})"><i class="uil uil-trash"></i>Delete</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });}

showRounds();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteround(roundId) {
    let confirmDel = confirm("Are you sure you want to delete this round?");
    if(!confirmDel) return;
    rounds.splice(roundId, 1);
    localStorage.setItem("rounds", JSON.stringify(rounds));
    showRounds();
}

function updateround(roundId, title, score, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = roundId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    //scoreTag = popupBox.querySelector('input[name="userScore"]'),
    scoreTag.value = score;
    descTag.value = description;
    popupTitle.innerText = "Update a Round";
    addBtn.innerText = "Update Round";
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

        let roundInfo = {title, score, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            rounds.push(roundInfo);
        } else {
            isUpdate = false;
            rounds[updateId] = roundInfo;
        }
        localStorage.setItem("rounds", JSON.stringify(rounds));
        showRounds();
        closeIcon.click();
    }
});