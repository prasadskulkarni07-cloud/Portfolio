/* =====================================================================
   PORTFOLIO INTERACTIVITY SCRIPT
   Handles: Dark Mode Detection, AI Chat Simulation, and Contact Form API placeholder
===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initAIChat();
  initContactForm();
});

/* ==========================================
   1. NIGHT / LIGHT MODE TOGGLE (Prompt 2 & 15)
   Auto-detects browser default and allows manual switch
========================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Detect user system preference
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme === "light");
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "light");
    updateIcon(true);
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme === "light");
  });

  function updateIcon(isLight) {
    if (isLight) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }
}

/* ==========================================
   2. AI CHAT INTERFACE SIMULATION (Prompt 10)
========================================== */
function initAIChat() {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatLog = document.getElementById("chat-log");

  // Knowledge base responses for Prasad Kulkarni
  const responses = {
    skills: "Prasad's primary competencies are Python, Java backend development, HTML frontend, MySQL, and Data Structures & Algorithms.",
    project: "Prasad developed the Oil Extraction project over a 3-week lifecycle, focusing on backend processing and tracking.",
    education: "Prasad is studying Information Science Engineering at Adichunchanagiri Institute of Technology (2025–2029) with a 7.3 CGPA.",
    contact: "You can reach Prasad via email at prasadskulkarni07@gmail.com or by phone at +91 95353 76801.",
    resume: "You can download Prasad's resume directly using the 'DOWNLOAD RESUME' button in the Hero section above!"
  };

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Append user query
    appendChatMessage("User", query, "user-message");
    chatInput.value = "";

    // Simulated Bot thinking and response
    setTimeout(() => {
      let reply = "I'm still learning! Ask me about Prasad's skills, projects, education, or contact info.";
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes("skill") || lowerQuery.includes("python") || lowerQuery.includes("java")) {
        reply = responses.skills;
      } else if (lowerQuery.includes("project") || lowerQuery.includes("oil")) {
        reply = responses.project;
      } else if (lowerQuery.includes("college") || lowerQuery.includes("education") || lowerQuery.includes("cgpa")) {
        reply = responses.education;
      } else if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("phone")) {
        reply = responses.contact;
      } else if (lowerQuery.includes("resume") || lowerQuery.includes("cv")) {
        reply = responses.resume;
      }

      /* -------------------------------------------------------------
         API INTEGRATION PLACEHOLDER (e.g. OpenAI / Gemini API):
         // const res = await fetch("https://api.openai.com/v1/chat/completions", {...});
         ------------------------------------------------------------- */

      appendChatMessage("Prasad AI", reply, "bot-message");
    }, 500);
  });

  function appendChatMessage(sender, text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${className}`;
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

/* ==========================================
   3. CONTACT FORM SUBMISSION (Prompt 11)
========================================== */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const statusDiv = document.getElementById("contact-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    /* ------------------------------------------------------------------
       EMAIL API INTEGRATION POINT (e.g., Resend, EmailJS, or Formspree)
       Example with Resend:
       await fetch('/api/send-email', {
         method: 'POST',
         body: JSON.stringify({ name, email, message })
       });
       ------------------------------------------------------------------ */

    statusDiv.textContent = "Transmission received! Prasad will get back to you shortly.";
    statusDiv.style.color = "var(--accent-color)";
    contactForm.reset();

    setTimeout(() => {
      statusDiv.textContent = "";
    }, 5000);
  });
}