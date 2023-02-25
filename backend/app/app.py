"""
App module.
"""
import os

import openai
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_restful import Api

from .config import ART_STYLE, IMAGE_CONFIG, TEXT_CONFIG

load_dotenv(".local.env", verbose=True)

if not os.environ.get("OPENAI_API_KEY"):
    raise ValueError("Must set `OPENAI_API_KEY` in environment variables")


app = Flask(__name__)
api = Api(app)


def parse_params(params: dict) -> dict:
    """
    Process the user inputs.
    """
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
    """
    Convert user-based inputs to a single text prompt for OpenAI.
    """
    s = "s" if params["number_players"] > 1 else ""

    return (
        f'Monster for a D&D game based on description - {params["description"]}. The monsters lives at location {params["location"] }.'
        f" Where the monster's D&D difficulty is suitable for"
        f' {params["number_players"]} player{s} around level {params["level"]}.'
    )


def create_image_prompt(value: str) -> str:
    return f"{ART_STYLE}. {value}"


@app.route("/monster", methods=["POST"])
def completions() -> dict:
    """
    Monster creation endpoint.
    """
    params = parse_params(request.json)

    prompt = create_prompt(params)
    print("PROMPT", prompt)

    # TEXT
    openai_text_params = TEXT_CONFIG.copy()
    openai_text_params["prompt"] = prompt

    text_result = openai.Completion.create(**openai_text_params)
    choice = text_result.choices[0]
    attributes = choice.text.strip()

    # IMAGE
    openai_image_params = IMAGE_CONFIG.copy()
    image_prompt = create_image_prompt(prompt)
    print("IMAGE PROMPT", image_prompt)
    openai_image_params["prompt"] = image_prompt

    image_result = openai.Image.create(**openai_image_params)
    item = image_result["data"][0]
    url = item["url"]

    return {"attributes": attributes, "image_url": url}
