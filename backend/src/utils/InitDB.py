import os
from sqlalchemy import create_engine, text
from src.DBmodels.models import Base

DB_FOLDER = "/app/Data"
DB_PATH = f"{DB_FOLDER}/performance.db"

def initialize_database():
    os.makedirs(DB_FOLDER, exist_ok=True)

    db_uri = f"sqlite:///{DB_PATH}"
    print(f"[initDB] Using SQLite DB at: {db_uri}")

    engine = create_engine(
        db_uri,
        echo=False,
        connect_args={"check_same_thread": False}
    )

    with engine.connect() as conn:
        conn.execute(text("PRAGMA journal_mode=WAL;"))
        conn.execute(text("PRAGMA synchronous=NORMAL;"))

    Base.metadata.create_all(engine)

    print("[initDB] SQLite Database initialized successfully.")


if __name__ == "__main__":
    initialize_database()
