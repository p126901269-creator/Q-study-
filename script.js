var currentLanguage = "fa";


// SUPPORT

function toggleSupport() {
    var box = document.getElementById("supportBox");

    if (box) {
        box.classList.toggle("active");
    }
}


// LANGUAGE

function changeLanguage() {

    currentLanguage = currentLanguage === "fa" ? "en" : "fa";

    var elements = document.querySelectorAll("[data-fa]");

    for (var i = 0; i < elements.length; i++) {

        if (currentLanguage === "en") {
            elements[i].textContent =
                elements[i].getAttribute("data-en");
        } else {
            elements[i].textContent =
                elements[i].getAttribute("data-fa");
        }

    }

    var button = document.getElementById("languageText");

    if (button) {
        button.textContent =
            currentLanguage === "fa" ? "English" : "فارسی";
    }

    var textarea = document.getElementById("schedule");

    if (textarea) {
        textarea.placeholder = currentLanguage === "fa"
            ? "مثلاً:\nریاضی\nعلوم\nزبان انگلیسی\nفارسی"
            : "Example:\nMath\nScience\nEnglish\nPersian";
    }

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "fa" ? "rtl" : "ltr";

    var result = document.getElementById("result");

    if (result) {
        result.style.display = "none";
    }
}


// STUDY PLANNER

function analyzeSchedule() {

    var textarea = document.getElementById("schedule");

    var result = document.getElementById("result");

    if (!textarea || !result) {
        return;
    }

    var input = textarea.value.trim();

    if (input === "") {

        alert(
            currentLanguage === "fa"
                ? "لطفاً نام درس‌هایت را وارد کن."
                : "Please enter your subjects."
        );

        textarea.focus();

        return;
    }


    // SEPARATE SUBJECTS

    var subjects = input
        .split(/[\n،,]+/)
        .map(function(item) {
            return item.trim();
        })
        .filter(function(item) {
            return item.length > 0;
        });


    if (subjects.length === 0) {
        alert("لطفاً نام درس‌ها را درست وارد کن.");
        return;
    }


    // CREATE PLAN

    var html = "";

    if (currentLanguage === "fa") {

        html += "<h3>✦ برنامه پیشنهادی تو آماده شد!</h3>";

        html += "<p>برای هر درس ۴۵ دقیقه مطالعه و ۱۰ دقیقه استراحت در نظر گرفته شده است.</p>";

        for (var i = 0; i < subjects.length; i++) {

            html +=
                "<div class='study-item'>" +
                "<strong>📘 درس " + (i + 1) + ": " +
                escapeHTML(subjects[i]) + "</strong>" +
                "<p>زمان مطالعه: ۴۵ دقیقه</p>" +
                "</div>";

            if (i < subjects.length - 1) {
                html += "<div class='break-item'>☕ ۱۰ دقیقه استراحت</div>";
            }
        }

        html += "<p>✦ در پایان برنامه، ۱۵ دقیقه برای مرور مطالب اختصاص بده.</p>";

        html += "<p class='result-note'>این برنامه بر اساس تعداد درس‌های واردشده ساخته شده و پیشنهاد اولیه است.</p>";

    } else {

        html += "<h3>✦ Your Study Plan Is Ready!</h3>";

        html += "<p>Each subject has 45 minutes of study time and a 10-minute break.</p>";

        for (var j = 0; j < subjects.length; j++) {

            html +=
                "<div class='study-item'>" +
                "<strong>📘 Subject " + (j + 1) + ": " +
                escapeHTML(subjects[j]) + "</strong>" +
                "<p>Study time: 45 minutes</p>" +
                "</div>";

            if (j < subjects.length - 1) {
                html += "<div class='break-item'>☕ 10-minute break</div>";
            }
        }

        html += "<p>✦ Keep 15 minutes for reviewing your lessons.</p>";

        html += "<p class='result-note'>This is a basic suggested schedule.</p>";
    }


    result.innerHTML = html;

    result.style.display = "block";

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// SAFE TEXT

function escapeHTML(text) { return text.replace(/[&<>"']/g, function(character) {

        var symbols = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return symbols[character];

    });

}