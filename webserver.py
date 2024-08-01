from quart import Quart, send_from_directory
import os

app = Quart(__name__, static_folder='/', static_url_path='')

@app.route('/')
@app.route('/home')
async def serve_index():
    if app.static_folder:
        return await send_from_directory(app.static_folder, 'index.html')
    else:
        return 'Static folder not configured'

@app.route('/<path:path>')
async def serve_static(path):
    if app.static_folder:
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return await send_from_directory(app.static_folder, path)
        else:
            return await send_from_directory(app.static_folder, 'index.html')
    else:
        return 'Static folder not configured'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True, use_reloader=False)