#!/bin/bash
# To start the services on Unix/Linux script to start services
echo "Starting AI Services for AIView Interview Platform..."
echo

echo "Starting Whisper Server..."
gnome-terminal -- bash -c "python whisper_server.py; exec bash" &
# Alternative for other terminals:
# xterm -e "python whisper_server.py" &
# konsole -e "python whisper_server.py" &

echo "Starting LLM Analysis Server..."
gnome-terminal -- bash -c "python llm_server.py; exec bash" &
# Alternative for other terminals:
# xterm -e "python llm_server.py" &
# konsole -e "python llm_server.py" &

echo
echo "AI Services are starting..."
echo "- Whisper Server: http://localhost:5001"
echo "- LLM Server: http://localhost:5002"
echo
echo "Make sure Ollama is running with a model (e.g., ollama run llama2)"
echo

# Wait for user input
read -p "Press Enter to continue..." 