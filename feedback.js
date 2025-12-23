let isAdmin = false;
const ADMIN_PASSWORD = "DODI@2006"; // можешь сменить
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
window.adminLogin = function () {
  const pass = prompt("Admin password:");
  if (pass === ADMIN_PASSWORD) {
    isAdmin = true;
    alert("Rezhim Admina piδid");
    loadFeedbacks(); // перерисовать отзывы
  } else {
    alert("Parol ɣalat");
  }
};

  function updateStars() {
    stars.forEach(star => {
      star.classList.toggle("active", Number(star.dataset.value) <= selectedRating);
    });
  }

  document.getElementById("send-review").onclick = async () => {
    const comment = document.getElementById("comment").value.trim();
    if (!selectedRating || !comment) {
      alert("Fukaδ pur kinxu bad, sitoraen marinês!");
      return;
    }

    await addDoc(collection(db, "reviews"), {
      rating: selectedRating,
      comment,
      created: Date.now()
    });

    document.getElementById("comment").value = "";
    selectedRating = 0;
    updateStars();
    renderReviews();
  };

  async function renderReviews() {
    reviewsDiv.innerHTML = "";

    const q = query(collection(db, "reviews"), orderBy("created", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      reviewsDiv.innerHTML = "<p>Ɣalen nist fikreen.</p>";
      clearBtn.style.display = "none";
      return;
    }

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

  clearBtn.onclick = () => {
    const pass = prompt("Admin parol:");
    if (pass !== ADMIN_PASSWORD) {
      alert("Parol xato");
      return;
    }
    isAdmin = true;
    renderReviews();
  };

  renderReviews();
});
