# AI/ML Integration Setup Guide

This guide will help you set up the local AI/ML services for transcription and analysis.

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Node.js** and npm (for your Next.js app)
3. **Ollama** (for local LLM) - [Install Ollama](https://ollama.com/)

## Step 1: Set Up Python Environment

```bash
# Create a virtual environment (recommended)
python -m venv ai-services
source ai-services/bin/activate  # On Windows: ai-services\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

## Step 2: Install Ollama and Download a Model

```bash
# Install Ollama (follow instructions at https://ollama.com/)
# Then download a model (choose one):
ollama pull llama2
# OR
ollama pull mistral
# OR
ollama pull codellama
```

## Step 3: Start the AI Services

### Terminal 1: Start Whisper Server

```bash
python whisper_server.py
```

You should see:

```
Loading Whisper model...
Whisper model loaded successfully!
Starting Whisper server on http://localhost:5001
```

### Terminal 2: Start LLM Analysis Server

```bash
python llm_server.py
```

You should see:

```
Starting LLM Analysis server on http://localhost:5002
Make sure Ollama is running with a model (e.g., 'ollama run llama2')
```

### Terminal 3: Start Ollama (if not already running)

```bash
ollama serve
```

## Step 4: Install Node.js Dependencies

```bash
# In your Next.js project directory
npm install form-data
```

## Step 5: Test the Services

### Test Whisper Server

```bash
curl -X GET http://localhost:5001/health
```

Expected response: `{"status": "healthy", "model": "whisper-base"}`

### Test LLM Server

```bash
curl -X GET http://localhost:5002/health
```

Expected response: `{"status": "healthy", "ollama": "connected"}`

## Step 6: Start Your Next.js App

```bash
npm run dev
```

## Troubleshooting

### Whisper Issues

- **Model download slow**: The first time you run Whisper, it downloads the model (~1GB). This may take a while.
- **Memory issues**: Use a smaller model like "tiny" or "base" instead of "large".
- **CUDA issues**: Whisper will use CPU by default. For GPU acceleration, install PyTorch with CUDA support.

### Ollama Issues

- **Model not found**: Make sure you've pulled the model: `ollama pull llama2`
- **Port conflicts**: Make sure port 11434 is available for Ollama
- **Memory issues**: Some models require significant RAM. Try a smaller model.

### API Issues

- **Connection refused**: Make sure both Python servers are running
- **CORS issues**: The Python servers are configured to accept requests from localhost
- **File upload issues**: Make sure the audio file is in a supported format (WAV, MP3, etc.)

## Configuration Options

### Whisper Models

In `whisper_server.py`, you can change the model size:

- `"tiny"` - Fastest, least accurate (~39MB)
- `"base"` - Good balance (~74MB)
- `"small"` - Better accuracy (~244MB)
- `"medium"` - High accuracy (~769MB)
- `"large"` - Best accuracy (~1550MB)

### LLM Models

In `llm_server.py`, you can change the model:

- `"llama2"` - Good general purpose
- `"mistral"` - Fast and efficient
- `"codellama"` - Good for technical content

## Performance Tips

1. **Whisper**: Use "base" model for development, "small" or "medium" for production
2. **LLM**: Use smaller models for faster responses
3. **Caching**: Consider caching transcriptions and analyses for repeated content
4. **Batch processing**: For multiple files, consider batch processing

## Production Considerations

1. **Scale**: Consider using cloud services for production (OpenAI API, Google Speech-to-Text, etc.)
2. **Security**: Add authentication to your Python servers
3. **Monitoring**: Add logging and monitoring to track usage and errors
4. **Error handling**: Implement retry logic and fallback mechanisms
