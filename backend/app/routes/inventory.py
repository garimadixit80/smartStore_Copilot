from fastapi import APIRouter
from app.services.inventory_service import get_inventory_status

router = APIRouter()

@router.get("/status")
def inventory_status():
    return get_inventory_status()
