# Builds sound_cues.html from the same LINES/word-interpolation the page uses (W()), so effects land on their words.
import re
s = open('flying.js', encoding='utf-8').read()
L = [(float(a), float(b), t.replace("\\'", "'")) for a, b, t in re.findall(r"\[([\d.]+), ([\d.]+), '((?:[^'\\]|\\.)*)'\]", s)]
assert len(L) == 32, len(L)

def W(i, w):
    a, b, t = L[i]; k = t.lower().find(w.lower()); assert k >= 0, (i, w); return a + (b - a) * k / len(t)

c = []
def A(n, t, d, v): c.append(f'<audio id="cue{len(c)}" src="assets/{n}" data-start="{t:.2f}" data-duration="{d}" data-volume="{v}"></audio>')

A('kit-mystical-ambient-pad-wet.wav', 0, 227, 0.12); A('kit-mystical-ambient-pad-wet.wav', 226, 103, 0.12)
A('race-car-pass.mp3', 0.2, 4.9, 0.35); A('race-car-pass.mp3', 322.0, 4.9, 0.3)
for t in [36.6, 101.0, 168.8, 203.4, 259.4, 300.5, 44.0, 66.3, 118.2, 154.0, 189.2, 223.6, 238.2, 249.4]: A('epic-swishes.wav', t, 1.04, 0.28)
for i, w, v in [(1, 'flips', .45), (7, 'fan system', .25), (8, 'And Rocket', .3), (10, 'ten small', .3), (12, 'rushes', .4), (13, 'Pushing gas', .4), (15, 'nudge', .35),
                (15, 'Astronauts', .3), (17, 'adds force', .4), (18, 'forwards', .4), (18, 'sideways', .4), (18, 'twist', .45), (19, 'hover', .3), (24, 'hop', .35),
                (24, 'twist', .35), (24, 'boost', .35), (27, 'Air blasting', .45), (29, 'jump', .4), (29, 'spin', .35)]:
    A('air-blast-release.wav', W(i, w), 1.65, v)
A('crowd-oh.mp3', W(0, 'upside down'), 1.9, 0.35); A('human-crowd.mp3', W(1, 'lands'), 2.38, 0.4)
A('impact-hits.wav', W(1, 'lands') + 0.15, 1.1, 0.4); A('impact-hits.wav', W(22, 'twenty-seven') + 1.2, 1.1, 0.5); A('impact-hits.wav', W(26, 'explode'), 1.1, 0.4)
for i, w in [(2, 'Texas'), (2, 'not AI'), (3, 'Roadster'), (3, 'flying car'), (5, 'McGregor'), (5, 'SpaceX helped'), (6, 'Two seats'), (6, 'rear wing'), (7, 'two g'),
             (8, 'one point six'), (8, 'zero point nine'), (8, 'zero point five nine'), (9, 'own claims'), (9, 'two hundred'), (9, 'three hundred'), (9, 'production'),
             (10, 'COPV'), (12, 'strong tank'), (12, 'valve opens'), (12, 'narrow nozzle'), (13, 'Newton'), (14, 'called cold'), (15, 'Falcon'), (17, 'grip'), (18, 'brake'),
             (18, 'turn'), (20, 'two tonnes'), (20, 'twenty thousand'), (21, 'seventy-three'), (21, 'three hundred'), (23, 'suitcase'), (26, 'sixteen'), (27, 'not approved'),
             (28, 'slow'), (29, 'Not really'), (30, 'Batteries'), (30, 'Suction'), (30, 'cold gas')]:
    A('echoing-pop.wav', W(i, w), 1, 0.3)
for i, w in [(17, 'spins'), (24, 'cannot cruise'), (27, 'no lane')]: A('buzz-error.mp3', W(i, w) + 0.3, 0.25, 0.35)
for i, w in [(0, 'Steeper'), (7, 'pulls it down'), (11, 'cold gas')]: A('action-power-up.mp3', W(i, w), 1.06, 0.3)
for i, w in [(14, 'no fire'), (26, 'checked'), (30, 'impossible')]: A('chime-musical-mallets-soft.mp3', W(i, w) + 0.3, 0.53, 0.45)
open('sound_cues.html', 'w').write('\n'.join(c) + '\n'); print(len(c), 'cues')
