// Shared VIP gate for all key pages. Loaded as a module on every page that uses VIP keys.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp({
  apiKey: "AIzaSyCqQoTs9zkFuHxQ9PCJyp5PzRlLe4Nf5Ks",
  authDomain: "mods-store-dream.firebaseapp.com",
  databaseURL: "https://mods-store-dream-default-rtdb.firebaseio.com",
  projectId: "mods-store-dream",
  storageBucket: "mods-store-dream.firebasestorage.app",
  messagingSenderId: "112654567418",
  appId: "1:112654567418:web:c59d08329945a608cb0643"
}, "vipcheck");
const auth = getAuth(app);
const db = getDatabase(app);
const BASE = /\/posts\//.test(location.pathname) ? "../" : "";

// Wait for Firebase to report the signed-in user (or none) once.
function firstUser() {
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, (u) => { stop(); resolve(u); });
  });
}

// Checks the plan in the database: users/{uid}.vip === true and vipExpiry in the future.
export async function vipStatus() {
  const user = await firstUser();
  if (!user) return { signedIn: false, active: false };
  try {
    const snap = await get(child(ref(db), "users/" + user.uid));
    const u = snap.val() || {};
    const exp = u.vipExpiry ? new Date(u.vipExpiry) : null;
    return { signedIn: true, active: u.vip === true && !!exp && exp > new Date(), expiry: exp };
  } catch (e) {
    return { signedIn: true, active: false, error: true };
  }
}

// Not signed in -> sign-in page. Signed in but no active plan -> plans page. Active -> VIP key page.
async function routeVip(target) {
  const s = await vipStatus();
  if (s.active) location.href = BASE + target;
  else location.href = BASE + (s.signedIn ? "plans.html" : "sign.html");
}

// Page guard: pages marked with data-vip-guard only open for an active VIP plan.
if (document.body && document.body.hasAttribute("data-vip-guard")) {
  const timer = setTimeout(() => {
    document.body.classList.add("vip-error");
    const box = document.createElement("div");
    box.className = "vip-error-box";
    box.innerHTML = "<b>We could not check your VIP plan.</b><p>Check your internet connection and refresh the page. If it still fails, <a href=\"contact.html\">contact us</a>.</p>";
    document.body.prepend(box);
  }, 8000);
  vipStatus().then((s) => {
    clearTimeout(timer);
    if (s.active) document.body.classList.add("vip-ok");
    else location.replace(BASE + (s.signedIn ? "plans.html" : "sign.html"));
  });
}

// Buttons and links marked with data-vip-key go through the check first.
document.querySelectorAll("[data-vip-key]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    routeVip("vipkey.html");
  });
});
