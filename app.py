from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Charger le modèle
model = load_model('job_recommendation_model.h5')

# Charger les données des emplois et initialiser le TF-IDF
jobs_data = pd.read_csv('data/linkedin_jobs.csv')
tfidf_jobs = TfidfVectorizer(max_features=100)
job_tfidf_matrix = tfidf_jobs.fit_transform(jobs_data['describtion']).toarray()

# Initialiser l'application FastAPI
app = FastAPI()

# Configurer CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autoriser toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes HTTP
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Modèle Pydantic pour la validation des requêtes
class UserDescription(BaseModel):
    description: str

@app.post("/recommend")
async def recommend_jobs(user_input: UserDescription):
    try:
        # Prétraiter la description utilisateur
        user_description = user_input.description
        user_vector = tfidf_jobs.transform([user_description]).toarray()

        # Créer des données d'entrée pour chaque job
        user_input_data = np.array([0] * len(jobs_data))  # ID utilisateur fictif
        job_input_data = jobs_data['job_id'].values
        user_features_data = np.repeat(user_vector, len(jobs_data), axis=0)
        job_features_data = job_tfidf_matrix

        # Faire des prédictions
        predictions = model.predict([user_input_data, job_input_data, user_features_data, job_features_data])

        # Ajouter les prédictions aux données des emplois
        jobs_data['match_probability'] = predictions
        recommended_jobs = jobs_data[
            ['job_id', 'jobs_titles', 'companies_names', 'jobs_locations', 'employment_type','describtion', 'match_probability']
        ].sort_values(by='match_probability', ascending=False).head(5)

        # Formater les résultats en dictionnaire
        return recommended_jobs.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
