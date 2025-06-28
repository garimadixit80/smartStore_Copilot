from fastapi import FastAPI
from app.routes import inventory, drivers, sentiment, chatbot

app = FastAPI(title="SmartStore Copilot")

app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(drivers.router, prefix="/api/drivers", tags=["Drivers"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["Chatbot"])

@app.get("/")
def root():
    return {"message": "SmartStore Copilot API is running"}
