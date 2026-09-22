
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
