from flask import Blueprint

home = Blueprint('views', __name__)

@home.route('/')
def homescreen():
    return "<h1>Test"