
@echo off
echo Starting AI Services for AIView Interview Platform...
echo.

echo Starting Whisper Server...
start "Whisper Server" cmd /k "python whisper_server.py"

echo Starting LLM Analysis Server...
start "LLM Server" cmd /k "python llm_server.py"

echo.
echo AI Services are starting...
echo - Whisper Server: http://localhost:5001
echo - LLM Server: http://localhost:5002
echo.
echo Make sure Ollama is running with a model (e.g., ollama run llama2)
echo.
pause 