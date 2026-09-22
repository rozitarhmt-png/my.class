
const calenderBtn = document.getElementById("calenderBtn");
const calender = document.getElementById("calender");
const main = document.querySelector("main");
const daybuttons = document.querySelectorAll(".day-btn");
const daysection = document.querySelectorAll(".day-section");
// const today = new Date();
// const todayIndax =today.getDate(); 


calenderBtn.addEventListener("click",function(){
    if(calender.style.display ==="none" ||calender.style.display ===""){
        //تقویم باز میشه 
        calender.style.display ="block";
        //برنامه کلاس ها مخفی میشه 
        main.style.display = "none";
    }else{
        // تقویم بسته شده 
        calender.style.display = "none";
        // برنامه کلاس ها برگردد
        main.style.display = "block";
    }
});
// انتخاب روز 
daybuttons.forEach(function(button,indax){
    button.addEventListener("click" , function(){
        // تقویم بسته شو
        calender.style.display = "none";
        // برنامه نمایش داده شود 
        main.style.display ="block";
        // همه روزا مخفی شوند
        daysection.forEach(function(section){
            section.style.display = "none";
        });
        // فقط روز انتخاب شده نمایش داده شود 
        daysection[indax].style.display = "block";
        daybuttons.forEach(function(btn){
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
   
});
//تشخیص روز های هفته 
const today = new Date() . getDay();

let todayIndax;
if (today === 6){
    todayIndax = 0 ; 
}else if (today === 0 ){
    todayIndax = 1 ; 
}else if (today ===1){
    todayIndax = 2 ;
}else if (today === 2){
    todayIndax = 3;
}else if ( today === 3){
    todayIndax = 4;
}
daysection.forEach(function(section){
    section.style.display = "none";
});
if (todayIndax !== undefined){
    daysection[todayIndax].style.display = "block";
}

const todayDate = new Date();
const weekDays = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "شنبه "
];
const todayDay = document.getElementById("todayDay");
const todayDateText = document.getElementById("todayDate");
todayDay.textContent = weekDays[todayDate.getDay()];
todayDateText.textContent = todayDate.toLocaleDateString("fa-IR",{
    year :"numeric",
    month: "long",
    day : "numeric"
});

const thisWeekIsEven = true;

const evenWeekTimes = document.querySelectorAll(".even-week");
const oddWeekTimes = document.querySelectorAll(".odd-week");

if (thisWeekIsEven) {

    evenWeekTimes.forEach(function(time) {
        time.style.display = "block";
    });

    oddWeekTimes.forEach(function(time) {
        time.style.display = "none";
    });

} else {

    evenWeekTimes.forEach(function(time) {
        time.style.display = "none";
    });

    oddWeekTimes.forEach(function(time) {
        time.style.display = "block";
    });

}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./sw.js")
            .then(function() {
                console.log("Service Worker با موفقیت ثبت شد ✅");
            })
            .catch(function(error) {
                console.log("خطا در ثبت Service Worker:", error);
            });
    });
}
const nextClassBox = document.querySelector(".next-class");
const nextClassName = document.getElementById("nextClassName");
const nextClassTime = document.getElementById("nextClassTime");
function updateNextClass() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todaySection = daysection[todayIndax];
    if (!todaySection) {
        nextClassBox.style.display = "none";
        return;
    }
    const cards = todaySection.querySelectorAll(".class-card");
    let foundClass = false;
    cards.forEach(function(card) {
        if (foundClass) return;
        const texts = card.querySelectorAll(".class-info p");
        if (texts.length < 2) return;
        const className = texts[0].textContent.trim();
        if (className === "آزادی") return;
        for (let i = 1; i < texts.length; i++) {
            // زمان‌هایی که در هفته فعلی مخفی هستند را رد کن
            if (texts[i].style.display === "none") {
                continue;
            }
            const timeText = texts[i].textContent.trim();
            const match = timeText.match(
                /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
            );
            if (!match) continue;
            const startMinutes =
                Number(match[1]) * 60 + Number(match[2]);
            const endMinutes =
                Number(match[3]) * 60 + Number(match[4]);
            // اگر الان داخل کلاس هستیم
            if (
                currentMinutes >= startMinutes &&
                currentMinutes < endMinutes
            ) {
                nextClassName.textContent = "🟢 " + className;
                nextClassTime.textContent =
                    "در حال برگزاری تا " +
                    match[3] + ":" + match[4];
                foundClass = true;
                return;
            }
            // اگر کلاس هنوز شروع نشده
            if (currentMinutes < startMinutes) {
                nextClassName.textContent = className;
                nextClassTime.textContent =
                    "⏰ " + timeText;
                foundClass = true;
                return;
            }
        }
    });
    if (!foundClass) {
        nextClassName.textContent = "امروز کلاس دیگه‌ای نداری 🎉";
        nextClassTime.textContent = "";
    }
    nextClassBox.style.display = "block";
}
updateNextClass();