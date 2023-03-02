"""
App module.
"""
import os

import openai
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api

from .config import ART_STYLE, CODE_CONFIG, IMAGE_CONFIG, MONSTER_SCHEMA, TEXT_CONFIG

load_dotenv(".local.env", verbose=True)

if not os.environ.get("OPENAI_API_KEY"):
    raise ValueError("Must set `OPENAI_API_KEY` in environment variables")


app = Flask(__name__)
CORS(app)
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
        return {"error": "Missing param 'description'"}
    if not location:
        return {"error": "Missing param 'location'"}
    if not level:
        return {"error": "Missing param 'level'"}
    if not number_players:
        return {"error": "Missing param 'number_players'"}

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
    players = params["number_players"]
    s = "s" if players > 1 else ""

    return (
        f'Monster for a D&D game based on description - {params["description"]}. The monster comes from location of {params["location"] }.'
        f" The monster's D&D difficulty is suitable for"
        f' {params["number_players"]} player{s} around level {params["level"]}.'
    )


def create_image_prompt(value: str) -> str:
    """
    Prepare text prompt for AI image generation.
    """
    return f"{ART_STYLE}. {value}"


def create_code_prompt(prompt):
    return f"""{prompt}

Return the monster's attributes as a JSON using this JSON schema:

```json
{MONSTER_SCHEMA}
```
"""


def get_text(prompt):
    openai_text_params = TEXT_CONFIG.copy()
    openai_text_params["prompt"] = prompt

    text_result = openai.Completion.create(**openai_text_params)
    choice = text_result.choices[0]

    return choice.text.strip()


def get_code(prompt: str) -> str:
    openai_text_params = CODE_CONFIG.copy()
    code_prompt = create_code_prompt(prompt)
    print("CODE_PROMPT", code_prompt)
    openai_text_params["prompt"] = code_prompt

    text_result = openai.Completion.create(**openai_text_params)
    choice = text_result.choices[0]

    return choice.text.strip()


def get_image(prompt):
    openai_image_params = IMAGE_CONFIG.copy()
    image_prompt = create_image_prompt(prompt)
    print("IMAGE PROMPT", image_prompt)
    openai_image_params["prompt"] = image_prompt

    image_result = openai.Image.create(**openai_image_params)
    item = image_result["data"][0]

    return item["b64_json"]


@app.route("/monster", methods=["POST"])
def completions() -> dict:
    """
    Monster creation endpoint.
    """
    params = parse_params(request.json)
    if params.get("error"):
        return jsonify(params), 400

    print("PARAMS", params)

    prompt = create_prompt(params)
    print("PROMPT", prompt)

    # attributes = get_text(prompt)
    attributes = get_code(prompt)
    print(attributes)

    image_data = ""
    # image_data = get_image(prompt)

    return {"attributes": attributes, "image": image_data}
