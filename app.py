from flask import Flask, render_template
from models import db,Book
from flask import request, jsonify

app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')

def home():
    return render_template('index.html')

with app.app_context():
    db.create_all()

@app.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = Book(title=data['title'],author=data['author'],description = data['description'], year = data['year'])
    db.session.add(new_book)
    db.session.commit()
    return {
        "id": new_book.id,
        "title":new_book.title,
        "author":new_book.author,
        "description":new_book.description
    },201

@app.route('/books',methods=['GET'])
def get_books():
    return jsonify([
        {'id':book.id, 'title':book.title,'author':book.author,'description':book.description,'year':book.year}
        for book in books
    ])

@app.route('/books/<int:id>',methods=['PUT'])
def update_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify ({'message':'Book not found'}),404
    data = request.get_json()
    book.title = data.get('title',book.title)
    book.author = data.get('author',book.author)
    book.description = data.get('description',book.description)
    book.year = data.get('year',book.year)
    db.session.commit()
    return jsonify({'message':'Book updated successfully'})

@app.route('/books/<int:id>',methods = ['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({'message':'Book not found'}),404
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message':'Book deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        books = Book.query.all()
        for book in books:
            print(book.title , book.author, book.description, book.year)
    app.run(debug=True)