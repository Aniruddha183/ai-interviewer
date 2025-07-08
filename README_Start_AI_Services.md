
---

# 🧠 AI Interview Platform – Local Setup Guide

This guide walks you through setting up and running all services required for the AI Interview Practice app.

---

## 📁 Prerequisites

* Python 3.8+
* Node.js 18+
* [`ollama`](https://ollama.com) installed and a model pulled (e.g. `llama2`)
* `whisper_server.py` and `llm_server.py` files are present
* Python virtual environment (venv) set up

---

## 🧪 Step-by-Step Setup

### ✅ Step 1: Set Up Python Environment

In your project root (where `whisper_server.py` and `llm_server.py` are located):

```bash
# Create a virtual environment if not already
python -m venv ai-services

# Activate it (Windows)
ai-services\Scripts\activate

# Or on Mac/Linux
source venv/bin/activate

# Install required packages
pip install -r requirements.txt
```

---

### 🎙️ Step 2: Start Whisper Server (Port 5001)

In **Terminal 1**, with venv activated:

```bash
python whisper_server.py
```

> This starts the Whisper speech-to-text server at:
> 🟢 `http://localhost:5001`

---

### 🧠 Step 3: Start LLM Analysis Server (Port 5002)

In **Terminal 2**, again activate your Python venv:

```bash
python llm_server.py
```

> This starts the LLM analysis feedback server at:
> 🟢 `http://localhost:5002`

---

### ⚙️ Step 4: Start Ollama (Required for LLM Backend)

In **Terminal 3**:

```bash
ollama serve
```

Make sure you’ve already pulled a model like:

```bash
ollama pull llama2
```

> Ollama runs on port `11434` by default and is used internally by `llm_server.py`.

---

### 🖥️ Step 5: (Optional) Use the Windows Batch Script

If you're on **Windows**, you can run both Python servers using:

```bash
start_ai_services.bat
```

> This opens two command windows:
> One for **Whisper**, one for **LLM**.

✅ You still need to run **Ollama separately**.

---

### 🔍 Step 6: Test the Services

#### ✅ Test Whisper Server

```bash
curl http://localhost:5001/health
```

Expected response:

```json
{ "status": "healthy", "model": "whisper-base" }
```

---

#### ✅ Test LLM Analysis Server

```bash
curl http://localhost:5002/health
```

Expected response:

```json
{ "status": "healthy", "ollama": "connected" }
```

---

### 💻 Step 7: Start the Next.js App

In **Terminal 4**, go to your frontend project directory:

```bash
npm install
npm run dev
```

> Your frontend should now run at:
> 🟢 `http://localhost:3000`

---

## ✅ Summary Table

| Service        | Command                    | Terminal | Notes                         |
| -------------- | -------------------------- | -------- | ----------------------------- |
| Whisper Server | `python whisper_server.py` | 1        | Needs Python venv             |
| LLM Server     | `python llm_server.py`     | 2        | Needs Python venv             |
| Ollama         | `ollama serve`             | 3        | Requires `llama2` or similar  |
| Next.js App    | `npm run dev`              | 4        | Run inside frontend directory |
| Batch Script   | `start_ai_services.bat`    | (Win)    | Starts Whisper + LLM servers  |

---

Let me know if you'd like the exact content of `whisper_server.py`, `llm_server.py`, or the batch file (`start_ai_services.bat`).
