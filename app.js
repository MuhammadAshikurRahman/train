
// এটি Leaflet.js এর মাধ্যমে একটি নতুন ম্যাপ তৈরি করে
// L.map('map') নির্দেশ করে যে, HTML পেজে যেই ডিভ আইডি 'map' আছে, সেটির মধ্যে ম্যাপটি রেন্ডার করবে
const map = L.map('map').setView([0, 0], 15); // Initialize map with default position

// Add OpenStreetMap tiles
// Tile হলো ম্যাপের ছোট ছোট অংশ বা টুকরো, যা একত্রে পুরো ম্যাপ তৈরি করে।
// addTo(map) ম্যাপ অবজেক্টে (যেটি আমরা L.map(...) দিয়ে তৈরি করেছি) এই টাইল লেয়ারটি যোগ করে।
// এর মাধ্যমে ম্যাপটি ব্যবহারকারীর স্ক্রিনে দৃশ্যমান হয়।
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);




//======================================================


// Check Internet Connection
// navigator.onLine
// এটি চেক করে যে ব্যবহারকারীর ডিভাইস অনলাইনে আছে কিনা
function checkInternetConnection() {
    if (navigator.onLine) {
      document.getElementById("connection-status").textContent = "You are online!";
    } else {
      document.getElementById("connection-status").textContent = "You are offline. Please check your internet connection.";
    }
  }
  
  // প্রথমবার লোড করার সময় ইন্টারনেট স্ট্যাটাস চেক করুন
  checkInternetConnection();
  
  // ইন্টারনেট সংযোগ পরিবর্তন হলে ইভেন্ট লিসেনার ব্যবহার করে স্ট্যাটাস চেক করুন
  window.addEventListener("online", checkInternetConnection);
  window.addEventListener("offline", checkInternetConnection);

// ====================================================





// Get user's location
// navigator.geolocation
// এটি ব্রাউজারের Geolocation API চেক করে। "navigator.geolocation" 
// যদি এটি সাপোর্ট করে, তাহলে পরবর্তী কোড ব্লক চালানো হয়।
// যদি সাপোর্ট না করে, তাহলে else ব্লক চালানো হয়।
// if - else তার 
if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition()
    // এটি একটি মেথড যা ব্যবহারকারীর বর্তমান লোকেশন সংগ্রহ করে।
    // এটি ব্যবহার করার সময়, এটি callback ফাংশন হিসেবে দুইটি প্যারামিটার নেয়
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 17); // Set map center to user's location

      // Add marker to the map
      L.marker([latitude, longitude]).addTo(map).bindPopup("You are here!").openPopup();

      // Update status
      document.getElementById("status").textContent = "You are here!";
    },
    () => {
      document.getElementById("status").textContent = "Unable to get your location.";
    }
  );
} else {
  document.getElementById("status").textContent = "Geolocation is not supported by your browser.";
}
