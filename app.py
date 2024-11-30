from flask import Flask, jsonify, request
import api_gemini as gemini

app = Flask(__name__)

@app.route("/get_respons", methods=['GET'])
def get_respons():
    response = gemini.generate_respons()

    data = [{"response" : response}]
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3000, debug=True)