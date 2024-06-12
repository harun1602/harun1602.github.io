import json
from typing import List, Any

from sqlalchemy import create_engine, Column, Integer, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Entry(Base):
    __tablename__ = "entries"

    identifier = Column(Integer, primary_key=True, autoincrement=True)
    selectedNumbers = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    input_text = Column(String)
    pattern = Column(String)

    def __init__(self, selectedNumbers: str, input_text: str, pattern: str):
        self.selectedNumbers = selectedNumbers
        self.input_text = input_text
        self.pattern = pattern

engine = create_engine("sqlite:///mydb.db", echo=True)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Database:
    def __init__(self):
        self.engine = engine
        self.Session = sessionmaker(bind=self.engine)

    def get_session(self):
        return self.Session()

    def save_submittedinfo(self, selected_numbers: List[int], input_value: Any, pattern: List[Any]):
        db = self.get_session()
        try:
            # Konvertiere input_value in einen JSON-String
            input_json = json.dumps(input_value)
            # Konvertiere selected_numbers und pattern in Strings
            selected_numbers_str = ','.join(map(str, selected_numbers))
            pattern_json = json.dumps(pattern)  # Konvertiere pattern ebenfalls in JSON
            # Erstelle und speichere den neuen Eintrag
            entry = Entry(
                selectedNumbers=selected_numbers_str,
                input_text=input_json,
                pattern=pattern_json
            )
            db.add(entry)
            db.commit()
            db.refresh(entry)
            return entry
        finally:
            db.close()

