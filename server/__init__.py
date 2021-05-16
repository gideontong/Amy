from flask import abort, request, jsonify, Flask
from transformers import pipeline


webserver = Flask('amy_serve')
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-125M')


@webserver.route('/complete_text', methods=['POST'])
def complete_text():
    text = request.json.get('text')
    
    if not text:
        abort(404)
    
    result = generator(text, do_sample=True, min_length=80)
    try:
        answer: str = result[0]['generated_text']
        answer = answer[len(text):]
        answer = ' '.join(answer.split())
        if '.' in answer:
            words = answer.split('.')
            words.pop()
            answer = '.'.join(words)
        return jsonify({'result': answer})
    except:
        abort(404)
