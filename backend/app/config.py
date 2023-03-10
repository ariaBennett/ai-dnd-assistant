TEXT_CONFIG = {"model": "text-curie-001", "max_tokens": 500, "temperature": 1}

_CODE_HIGH_MODEL = "gpt-3.5-turbo"
_CODE_LOW_MODEL = "code-cushman-001"
CODE_CONFIG = {"model": _CODE_HIGH_MODEL, "max_tokens": 1024}

_SMALL = "256x256"
_MEDIUM = "512x512"
_LARGE = "1024x1024"
IMAGE_CONFIG = {"response_format": "b64_json", "size": _LARGE}

ART_STYLE = "D&D dark fantasy handbook style in color painting"

with open("app/schemas/monster.json") as f_in:
    MONSTER_SCHEMA = f_in.read()
