from fastapi import FastAPI
from app.routes import inventory, drivers, sentiment, chatbot, weather  # Added weather here

app = FastAPI(title="SmartStore Copilot")

# Route registration
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(drivers.router, prefix="/api/drivers", tags=["Drivers"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])  # ✅ Added this line

# Root endpoint
@app.get("/")
def root():
    return {"message": "SmartStore Copilot API is running"}
