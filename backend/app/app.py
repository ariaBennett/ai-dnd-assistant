"""
App module.
"""
import os

import openai
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_restful import Api

from .config import TEXT_CONFIG

load_dotenv(".local.env", verbose=True)

if not os.environ.get("OPENAI_API_KEY"):
    raise ValueError("Must set `OPENAI_API_KEY` in environment variables")

app = Flask(__name__)
api = Api(app)


def parse_params(params):
    description = params.get("description")
    location = params.get("location")
    level = params.get("level")
    number_players = params.get("numberPlayers")

    if not description:
        return jsonify({"error": "Missing param 'description'"}), 400
    if not location:
        return jsonify({"error": "Missing param 'location'"}), 400
    if not level:
        return jsonify({"error": "Missing param 'level'"}), 400
    if not number_players:
        return jsonify({"error": "Missing param 'number_players'"}), 400

    return dict(
        description=description,
        location=location,
        level=level,
        number_players=number_players,
    )


def create_prompt(params: dict) -> str:
    return params["description"]


@app.route("/monster", methods=["POST"])
def completions():
    """
    Monster creation endpoint.
    """
    params = parse_params(request.json)

    openai_text_params = TEXT_CONFIG.copy()
    openai_text_params["prompt"] = create_prompt(params)

    result = openai.Completion.create(**openai_text_params)
    choice = result.choices[0]
    attributes = choice.text.strip()

    return {"attributes": attributes, "image_url": ""}
