// =========== Theme Handler ===========
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(darkMode) {
  document.body.classList.toggle('dark', darkMode);
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}
function updateThemeFromSystem() {
  applyTheme(darkModeMediaQuery.matches);
}
darkModeMediaQuery.addEventListener('change', updateThemeFromSystem);
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  updateThemeFromSystem();
}

// =========== Firebase Setup ===========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKOBUtjR7AE00VKibQdB7Sy6I6Aj_WMoo",
  authDomain: "mym-library.firebaseapp.com",
  projectId: "mym-library",
  storageBucket: "mym-library.appspot.com",
  messagingSenderId: "81380727019",
  appId: "1:81380727019:web:b622d1f038e8f9ee6de13b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========== Book Reads Handling ===========
async function incrementRead(bookId) {
  try {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      reads: increment(1)
    });
    // Local count
    const current = parseInt(localStorage.getItem(`read_${bookId}`)) || 0;
    localStorage.setItem(`read_${bookId}`, current + 1);
  } catch (e) {
    console.error("Error incrementing read count:", e);
  }
}

window.markAsRead = async function(bookId) {
  await incrementRead(bookId);
  highlightMostReadBook();
};

async function highlightMostReadBook() {
  const booksSnapshot = await getDocs(collection(db, "books"));
  let maxReads = -1;
  let mostReadBookId = null;

  booksSnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.reads > maxReads) {
      maxReads = data.reads;
      mostReadBookId = docSnap.id;
    }
  });

  document.querySelectorAll('.book').forEach(book => {
    book.classList.remove('most-read');
  });
  const mostReadElem = document.querySelector(`[data-book-id="${mostReadBookId}"]`);
  if (mostReadElem) {
    mostReadElem.classList.add('most-read');
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".read-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const bookId = btn.dataset.bookId;
      await incrementRead(bookId);
      highlightMostReadBook();
    });
  });
  highlightMostReadBook();
});
