from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Store notes as dictionaries
notes_database = []

@app.route('/')
def index():
    return render_template('index.html', notes=notes_database)

@app.route('/add', methods=['POST'])
def add_note():

    title = request.form.get('title')
    content = request.form.get('note')

    if title and content:
        notes_database.append({
            "title": title,
            "content": content
        })

    return redirect('/')


@app.route('/delete/<int:index>')
def delete_note(index):

    if 0 <= index < len(notes_database):
        notes_database.pop(index)

    return redirect('/')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)