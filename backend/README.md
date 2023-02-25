# Backend

## Setup

Install Python 3.6 or higher.

Create virtual environment and install packages.

```sh
cd backend

python3 -m venv venv
source venv/bin/activate
make default
```

## Configuration

1. Signup for an account at https://openai.com
1. Create your API key or get one from your team.
1. Create file `backend/.local.env` in a local copy of this repo, which will be ignored by Git.
1. Add your content and save. e.g.
    ```sh
    OPENAI_API_KEY='sk-abcdef123'
    ```

## Usage

```sh
cd backend

source venv/bin/activate
make run
```