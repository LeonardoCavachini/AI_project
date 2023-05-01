from flask import jsonify, render_template, request, Blueprint
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
openai.api_key = os.getenv('OPENAI_API_KEY')

app_blueprint = Blueprint('app',__name__)
CORS(app_blueprint)

@app_blueprint.route('/')
@app_blueprint.route('/app', methods=['POST'])
def index():
	if request.method == 'POST':
		data = request.get_json()
		prompt = data['prompt']
		response = openai.Completion.create(
			prompt=prompt,
			model = 'text-davinci-003',
			max_tokens = 2048
		)
		
		return jsonify({
			prompt: response.choices[0].text
		})
	return render_template("index.html")
