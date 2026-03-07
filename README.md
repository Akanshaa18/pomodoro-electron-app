# 🍅 Pomodoro (Because the mac Clock app bored me)

I made this Pomodoro timer because I was tired of staring at the default macOS Clock when studying. 
You know the one. The one that looks dull and doesn't allow you to type the time out in the timer(for some reason I cannot type 30).

Also, I didn't want to download yet another productivity app, sign up for an account and get 100s of emails for it.

So I did the only reasonable thing:
**I BUILT MY OWN**

This is a simple **Electron + Vite + React Pomodoro timer** that runs as a real macOS desktop app. It is not fancy, not crazy amazing, the UI just has a bit of colour to it. But it does the job without annoying me.

---

# ✨ Features

* ⏱ **Pomodoro timer** (25 / 5 / 15)
* 🔔 **Desktop notifications + sound**
* 🍅 **Session progress dots**
* 🚫 **No accounts**
* 🚫 **No motivational quotes**

Just a timer.

---

# 🖥 Tech Stack

* **React**
* **Vite**
* **Electron**
* **electron-builder**

---

# 📦 Project Structure

```
pomodoro/
│
├─ src/                # React frontend
├─ electron/           # Electron main + preload
│   ├─ main.mjs
│   └─ preload.cjs
│
├─ dist/               # Vite production build
├─ build/              # App icons / packaging resources
│
├─ package.json
├─ vite.config.js
└─ .gitignore
```

---

# 🚀 Running the app locally

## 1️⃣ Install dependencies

```
npm install
```

---

## 2️⃣ Run the development version

This runs:

* the **Vite dev server**
* the **Electron desktop app**

```
npm run dev:desktop
```

Your app will open as a desktop window while React runs from:

```
http://localhost:5173
```

---

# 🛠 Run full app with Dev Tools

```
npm run dev:desktop
```

---

# 📦 Packaging into a real macOS app

This project uses **electron-builder**.

## Build the desktop app

```
npm run dist:mac
```

This will:

1. Build the React app
2. Package Electron
3. Generate a macOS application

---

## After building

You will find the packaged app in:

```
dist/mac/
```

Example output:

```
dist/mac/Pomodoro.app   # this is the usable app
dist/Pomodoro-x.x.x.dmg  # installer to share with others
```

---

# 🍅 How to use the timer

If you are on GitHub, I am sure you can figure this one out.
---

# 🧠 Why this exists

Because sometimes the fastest way to get a better tool is:

**build the exact thing you wanted in the first place**

Also because I really didn't want to download another app.

Also, I have been doing only math for the past few months, I needed to just do something that I understand well.

---

# 📜 License

Use it, modify it, improve it, do whatever.
