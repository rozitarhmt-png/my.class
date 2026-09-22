self.addEventListener("install", function(event) {
    console.log("Service Worker نصب شد ✅");
});

self.addEventListener("activate", function(event) {
    console.log("Service Worker فعال شد ✅");
});