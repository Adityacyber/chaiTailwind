# ☕ chai.js — Lightweight Utility-First CSS Engine

A lightweight utility-first CSS engine built using pure JavaScript.

Instead of writing traditional CSS, you can use utility classes like:
```chai-p-4 chai-bg-indigo chai-text-white```

And chai.js will dynamically convert them into inline styles — no build step, no dependencies.

---

## 🚀 Live Demo

🔗 Live Site: https://your-site.netlify.app  
💻 GitHub Repo: https://github.com/your-username/chai-tailwind

---

## ✨ Features

- ⚡ Utility-first approach (like Tailwind)
- 🧠 Regex-based class parsing
- 🎯 Dynamic DOM scanning
- 🎨 Design tokens (colors, spacing, typography)
- 📦 Zero dependencies
- 🪶 Lightweight

---

## 🧩 How It Works

1. **Scan DOM**
   - Finds all elements with `chai-*` classes

2. **Parse Classes**
   - Removes `chai-` prefix
   - Matches utility using regex

3. **Generate Styles**
   - Converts values using helper functions

4. **Apply Styles**
   - Applies inline styles using JavaScript

5. **Cleanup**
   - Removes original `chai-*` classes

---

## 📁 Project Structure
```
chai-tailwind/
│
├── index.html
├── script.js
├── style.css
│
├── core/
│ ├── engine.js
│ ├── parser.js
│ └── processor.js
│
├── rules/
│ └── rules.js
│
├── utils/
│ └── helpers.js
│
├── config/
│ └── tokens.js
│
└── README.md
```

---

## 🛠️ Installation

### 1. Clone the repo
```git clone https://github.com/your-username/chai-tailwind.git```

### 2. Open project

Use Live Server or any local server:

---

## ⚙️ Usage

Include script:

```html
<script type="module" src="./chai.js"></script>
```
Use utility classes:

```html
<div class="chai-p-4 chai-bg-indigo chai-text-white chai-rounded-lg">
  Hello chai.js 🚀
</div>
```


## 🧠 Concepts Used
- DOM Manipulation
- Regex Parsing
- JavaScript Modules
- Utility-first CSS architecture


## 🚧 Challenges Faced
- Handling modular imports
- Managing shared design tokens
- Efficient class parsing


## 🔮 Future Improvements
- Dynamic DOM updates
- Responsive utilities (chai-md-p-4)
- Hover & state support
- Class caching for performance
- Dark mode utilities

## 🧑‍💻 Author
Aditya Om
