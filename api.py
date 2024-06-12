from fastapi import Depends
from db import Database, Entry


class API:
    def __init__(self, database):
        self.database = database

    def create_entry(self, selected_numbers: list[int], db):
        entry = Entry(selectedNumbers=selected_numbers)
        db.add(entry)
        db.commit()
        return {"message": "Entry created successfully"}

    def get_entries(self, db):
        entries = db.query(Entry).all()
        return entries
