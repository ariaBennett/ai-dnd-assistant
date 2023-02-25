SHELL = /bin/bash
APP_DIR = app


default: install install-dev


h help:
	@grep '^[a-z]' Makefile


install:
	pip install pip --upgrade
	pip install -r requirements.txt

install-dev:
	pip install -r requirements-dev.txt


fmt:
	black .
	isort .

fmt-check:
	black . --diff --check
	isort . --diff --check-only

pylint:
	source .env \
		&& pylint $(APP_DIR) \
		|| pylint-exit $$?

flake8:
	# Error on syntax errors or undefined names.
	flake8 . --select=E9,F63,F7,F82 --show-source
	# Warn on everything else.
	flake8 . --exit-zero

lint: pylint flake8

fix: fmt lint


run:
	flask --app app/app --debug run