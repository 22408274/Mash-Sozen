const ADMIN_PASSWORD = "DODI@2006"; // VARTHIM BEDAL CHID
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  let selectedRating = 0;

  const stars = document.querySelectorAll("#stars span");
  const reviewsDiv = document.getElementById("reviews");
  const clearBtn = document.getElementById("clear-reviews");


  stars.forEach(star => {
    star.onclick = () => {
      selectedRating = Number(star.dataset.value);
      updateStars();
    };
  });

  function updateStars() {
    stars.forEach(star => {
      star.classList.toggle("active", Number(star.dataset.value) <= selectedRating);
    });
  }

  document.getElementById("send-review").onclick = async () => {
    const nameInput = document.getElementById("user-name");
const name = nameInput.value.trim();
const comment = document.getElementById("comment").value.trim();

if (!name || !selectedRating || !comment) {
  alert("Fukaϑ pur kin");
  return;
}
    await addDoc(collection(db, "reviews"), {
      rating: selectedRating,
      name: name,
      text:comment,
      created: Date.now()
    });

    nameInput.value = "";
document.getElementById("comment").value = "";

    document.getElementById("comment").value = "";
    selectedRating = 0;
    updateStars();
  async function renderReviews() {
  const q = query(collection(db, "reviews"));
  const snapshot = await getDocs(q);

  reviewsDiv.innerHTML = "";

  const list = [];

  snapshot.forEach(docSnap => {
    list.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  list.sort((a, b) => b.rating - a.rating);

  list.forEach(r => {
    const div = document.createElement("div");
    div.className = "review";

    div.innerHTML = `
      <div class="review-stars">${"★".repeat(r.rating)}</div>
      <div class="review-name"><b>${r.name}</b></div>
      <div class="review-text">${r.text}</div>
    `;

    reviewsDiv.appendChild(div);
  });
}

renderReviews();


    clearBtn.style.display = isAdmin ? "inline-block" : "none";

    snapshot.forEach(docSnap => {
      const r = docSnap.data();
      const div = document.createElement("div");

      div.innerHTML = `
        <strong>${"★".repeat(r.rating)}</strong>
        <p>${r.comment}</p>
        ${isAdmin ? `<button data-id="${docSnap.id}">Toza čido</button>` : ""}
      `;

      if (isAdmin) {
        div.querySelector("button").onclick = async () => {
          await deleteDoc(doc(db, "reviews", docSnap.id));
          renderReviews();
        };
      }

      reviewsDiv.appendChild(div);
    });
  }

  renderReviews();
});
const adminLink = document.getElementById("admin-link");

function adminLogin() {
  const password = prompt("Admin parol");

  if (password === "DODI@2006") { // ← MU PAROL
    localStorage.setItem("isAdmin", "true");
    alert("Admin rezhim");
    location.reload(); 
  } else {
    alert("Parol ghalat");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const adminLink = document.getElementById("admin-link");

  console.log("admin-link:", adminLink);
  console.log("isAdmin:", localStorage.getItem("isAdmin"));

  if (adminLink && localStorage.getItem("isAdmin") === "true") {
    adminLink.style.display = "block";
  }
});
window.adminLogin = function () {
  const password = prompt("Admin parol");

  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    alert("Admin rezhim");
    location.reload();
  } else {
    alert("Parol ghalat");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const adminLink = document.getElementById("admin-link");

  if (adminLink && localStorage.getItem("isAdmin") === "true") {
    adminLink.style.display = "block";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scroll-top-btn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
