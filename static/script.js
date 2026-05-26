document.addEventListener("DOMContentLoaded", () => {

    const textArea =
        document.querySelector("textarea[name='note']");

    const titleInput =
        document.querySelector("input[name='title']");

    // =========================
    // HISTORY CLICK
    // =========================

    function bindHistoryEvents() {

        const historyItems =
            document.querySelectorAll(".history-item");

        historyItems.forEach(item => {

            item.addEventListener("click", () => {

                historyItems.forEach(i =>
                    i.classList.remove("active")
                );

                item.classList.add("active");

                // NEW NOTE
                if (
                    item.innerText.trim() ===
                    "New Note"
                ) {

                    titleInput.value = "";
                    textArea.value = "";

                    return;
                }

                // LOAD NOTE
                titleInput.value =
                    item.innerText.trim();

                textArea.value =
                    item.dataset.content || "";
            });
        });
    }

    bindHistoryEvents();

    // =========================
    // NEW NOTE BUTTON
    // =========================

    document.querySelector(
        'button[title="New Note"]'
    ).addEventListener("click", () => {

        document.querySelectorAll(".history-item")
            .forEach(i =>
                i.classList.remove("active")
            );

        document.querySelector(".history-item")
            .classList.add("active");

        titleInput.value = "";
        textArea.value = "";
    });

    // =========================
    // EMAIL BUTTON
    // =========================

    document.querySelector(
        'button[title="Email"]'
    ).addEventListener("click", () => {

        const text =
            textArea.value.trim();

        const title =
            titleInput.value.trim();

        // EMPTY CHECK
        if (text.length === 0) {

            alert("Note is empty.");

            return;
        }

        // MAIL SUBJECT
        const subject =
            encodeURIComponent(
                title || "Shared Note"
            );

        // MAIL BODY
        const body =
            encodeURIComponent(text);

        // OPEN MAIL APP
        window.location.href =
            `mailto:?subject=${subject}&body=${body}`;
    });

    // =========================
    // SEARCH BUTTON
    // =========================

    document.querySelector(
        'button[title="Search"]'
    ).addEventListener("click", () => {

        const query =
            prompt("Search note title:");

        if (query === null) return;

        const lower =
            query.toLowerCase();

        document.querySelectorAll(".history-item")
            .forEach(item => {

                if (
                    item.innerText
                    .toLowerCase()
                    .includes(lower)
                ) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";
                }
            });
    });

    // =========================
    // DELETE BUTTON
    // =========================

    document.querySelector(
        'button[title="Delete"]'
    ).addEventListener("click", () => {

        const active =
            document.querySelector(
                ".history-item.active"
            );

        // NOTHING SELECTED
        if (!active) {

            alert("Select a note first.");

            return;
        }

        // BLOCK NEW NOTE
        if (
            active.innerText.trim() ===
            "New Note"
        ) {

            alert("Cannot delete New Note.");

            return;
        }

        // GET INDEX
        const index =
            active.dataset.index;

        // INVALID INDEX
        if (
            index === undefined ||
            index === null
        ) {

            alert("Delete failed.");

            return;
        }

        // CONFIRM
        const ok =
            confirm("Delete this note?");

        if (!ok) return;

        // DELETE ROUTE
        window.location.href =
            `/delete/${index}`;
    });

});