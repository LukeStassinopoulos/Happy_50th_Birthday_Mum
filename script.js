/*
  PERSONALISE THIS FILE:
  1. Change recipientName and senderName.
  2. Replace the sample memories with your own captions and photo filenames.
  3. Put your photos inside the assets/ folder.
  4. Edit the letter and reasons list so it sounds like you.
*/

const recipientName = "Chrissie";
const senderName = "Luke";

const memories = [
  {
    image: "assets/memory-2.jpg",
    date: "Old times",
    title: "Looking back",
    caption: "You always have my best interests at heart, and I am grateful for your guidance.",
    tilt: "-1.5deg"
  },
  {
    image: "assets/memory-1.jpg",
    date: "Together",
    title: "Big Smiles",
    caption: "Everything is better when we share it with you.",
    tilt: "1deg"
  },
  {
    image: "assets/memory-3.jpg",
    date: "Out and about",
    title: "Table for two",
    caption: "Always bringing warmth and making me comfortable.",
    tilt: "-.6deg"
  },
  {
    image: "assets/memory-4.jpg",
    date: "At the beach",
    title: "To the beach and beyond",
    caption: "Putting up with my antics and always making me laugh.",
    tilt: "1.3deg"
  },
  {
    image: "assets/memory-5.jpg",
    date: "A favourite day",
    title: "Deal or no deal",
    caption: "A day that will always make me smile.",
    tilt: "-1deg"
  },
  {
    image: "assets/memory-6.jpg",
    date: "Always",
    title: "More memories to come",
    caption: "Here's to many more moments together.",
    tilt: ".8deg"
  }
];

const letterParagraphs = [
  "Happy birthday! I wanted to make something extra special for you this year. So I collected some our photos and memories, and put them together.",
  "Thank you for the care, laughter, and love you bring into our lives. The little things you do matter more than you probably realise, and so many of my favourite memories have you in them.",
  "I hope today reminds you how appreciated you are, not just for everything you do for other people, but simply for being who you are. You deserve a year full of good surprises, peaceful moments, and reasons to smile.",
  "I'm so grateful to be your son and that you are part of our family. Happy birthday let's make many more memories together."
];

const reasons = [
  "You are the most caring and gracious person that I know.",
  "You are always worried about others and put their needs before your own.",
  "You are able to love us through anything and everything, always being supportive.",
  "There are so many memories still waiting for us to make together."
];

// Set up the personal names and letter.
document.title = `Happy Birthday, ${recipientName}`;
document.getElementById("recipient-name").textContent = recipientName;
document.getElementById("sender-name").textContent = senderName;
document.getElementById("letter-body").textContent = letterParagraphs.join("\n\n");

// Build the photo gallery. Missing photo files show a helpful placeholder.
const grid = document.getElementById("memory-grid");
memories.forEach((memory) => {
  const card = document.createElement("article");
  card.className = "memory-card";
  card.style.setProperty("--tilt", memory.tilt || "0deg");

  const imageWrap = document.createElement("div");
  imageWrap.className = "memory-image-wrap";
  const img = document.createElement("img");
  img.src = memory.image;
  img.alt = memory.title;
  img.loading = "lazy";
  img.onerror = () => {
    imageWrap.innerHTML = "";
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";
    placeholder.textContent = `Add ${memory.image.replace("assets/", "")} to the assets folder`;
    imageWrap.appendChild(placeholder);
  };
  imageWrap.appendChild(img);

  const date = document.createElement("p");
  date.className = "memory-date";
  date.textContent = memory.date;
  const title = document.createElement("h3");
  title.className = "memory-title";
  title.textContent = memory.title;
  const caption = document.createElement("p");
  caption.className = "memory-caption";
  caption.textContent = memory.caption;

  card.append(imageWrap, date, title, caption);
  grid.appendChild(card);
});

// Build the short notes.
const noteList = document.getElementById("note-list");
reasons.forEach((reason) => {
  const item = document.createElement("div");
  item.className = "note-item";
  const icon = document.createElement("span");
  icon.className = "note-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "✳";
  const text = document.createElement("p");
  text.textContent = reason;
  item.append(icon, text);
  noteList.appendChild(item);
});

// Gentle reveal animations, with a fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.getElementById("begin-button").addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
