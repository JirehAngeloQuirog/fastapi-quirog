import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get the PostgreSQL database URL from environment variables
# You can set this in Render's settings as the DATABASE_URL
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://quirog_todobackend_user:tI1A62gDv1g3JfZpFe7v3NZhF4wvcIK1@dpg-cvppg895pdvs73ed9bmg-a/quirog_todobackend")

# Create the engine and sessionmaker
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
