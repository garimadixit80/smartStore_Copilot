import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATA_DIR = os.getenv("DATA_DIR", "../data/")

settings = Settings()
