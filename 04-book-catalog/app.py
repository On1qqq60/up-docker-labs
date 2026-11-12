from flask import Flask, jsonify, request

app = Flask(__name__)
app.json.ensure_ascii = False
books = [
    {"id": 1, "title": "Docker. Начало работы", "author": "Учебная практика"},
]


@app.get("/")
def index():
    return jsonify({"service": "book-catalog", "endpoints": ["/books", "/health"]})


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/books")
def list_books():
    return jsonify(books)


@app.post("/books")
def add_book():
    payload = request.get_json(silent=True) or {}
    title = payload.get("title")
    if not title:
        return jsonify({"error": "title is required"}), 400
    item = {
        "id": (max(book["id"] for book in books) + 1) if books else 1,
        "title": title,
        "author": payload.get("author", ""),
    }
    books.append(item)
    return jsonify(item), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
