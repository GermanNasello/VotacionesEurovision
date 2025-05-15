import json

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

votaciones = {}


@app.route('/<hogar>/<usuario>/<pais>', methods=['GET'])
def obtener_voto(hogar, usuario, pais):

    nota = votaciones.get(hogar, {}).get(usuario, {}).get(pais)
    if nota is not None:
        return jsonify({'nota': nota})
    return jsonify({'nota': None}), 202


@app.route('/<hogar>/<usuario>/<pais>', methods=['POST'])
def guardar_voto(hogar, usuario, pais):

    data = request.json
    nota = data.get('nota')

    if nota is None or not (0 <= nota <= 10):
        return jsonify({'error': 'La nota debe estar entre 0 y 10'}), 400

    if hogar not in votaciones:
        votaciones[hogar] = {}
    if usuario not in votaciones[hogar]:
        votaciones[hogar][usuario] = {}

    votaciones[hogar][usuario][pais] = nota

    try:
        with open("votaciones.json", "w") as file:
            json.dump(votaciones, file, indent=4)
    except:
         print("No existe digo yo")

    return jsonify({'mensaje': f'Votación guardada: {usuario} en {hogar} votó {nota} para {pais}'})



@app.route('/<hogar>/votaciones/pais', methods=['GET'])
def resumen_votaciones_por_pais(hogar):
    hogar_votos = votaciones.get(hogar)
    if not hogar_votos:
        return jsonify({'error': 'No hay votaciones para este hogar'}), 404

    resumen = {}
    for usuario in hogar_votos.values():
        for pais, nota in usuario.items():
            if pais not in resumen:
                resumen[pais] = []
            resumen[pais].append(nota)

    promedios = [
        (pais, round(sum(notas) / len(notas), 2))
        for pais, notas in resumen.items()
    ]
    promedios_ordenados = sorted(promedios, key=lambda item: item[1], reverse=True)
    print(type(promedios_ordenados))
    return jsonify(promedios_ordenados)

@app.route('/<hogar>/votaciones/<pais>', methods=['GET'])
def resumen_votaciones_por_persona(hogar, pais):
    hogar_votos = votaciones.get(hogar)
    if not hogar_votos:
        return jsonify({'error': 'No hay votaciones para este hogar'}), 404

    resumen = {}
    acumulada_votos=0
    for nombre,usuario in hogar_votos.items():
        voto = usuario.get(pais)
        if voto:
            resumen[nombre]=voto
            acumulada_votos+=voto

    resumen['Promedio']=acumulada_votos/(len(hogar_votos.values()))
    resumen_ordenado = sorted(resumen.items(), key=lambda item: item[1], reverse=True)
    print(resumen_ordenado)
    return jsonify(resumen_ordenado)


if __name__ == '__main__':
    try:
        with open("votaciones.json","r") as file:
            votaciones = json.load(file)
    except:
         print("No existe digo yo")
    app.run(host='0.0.0.0', port=8080, debug=True)
